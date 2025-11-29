import pandas as pd
import numpy as np
from datetime import timedelta
from statsmodels.tsa.holtwinters import ExponentialSmoothing

# ----------------------------
# 1. Read data
# ----------------------------
data = pd.read_excel("household_power_cleaned.xlsx")

# Convert date and time
data['date'] = pd.to_datetime(data['Date'], format='%d/%m/%Y')
data['time'] = pd.to_timedelta(data['Time'])
data['datetime'] = data['date'] + data['time']

# ----------------------------
# 2a. Daily total energy
# ----------------------------
daily_ts = data.groupby('date')[['Sub_metering_1','Sub_metering_2','Sub_metering_3']].sum().reset_index()
daily_ts_long = daily_ts.melt(id_vars='date', var_name='submeter', value_name='energy')

# ----------------------------
# 2b. Hourly energy
# ----------------------------
hourly_ts = data.groupby('datetime')[['Sub_metering_1','Sub_metering_2','Sub_metering_3']].sum().reset_index()
hourly_ts_long = hourly_ts.melt(id_vars='datetime', var_name='submeter', value_name='energy')

# ----------------------------
# 3a. Daily forecast for next 7 days (ETS)
# ----------------------------
daily_forecast_list = []
for sub in ['Sub_metering_1','Sub_metering_2','Sub_metering_3']:
    ts = daily_ts.set_index('date')[sub]
    model = ExponentialSmoothing(ts, trend='add', seasonal=None)
    fit = model.fit()
    future_dates = [ts.index.max() + timedelta(days=i) for i in range(1, 8)]
    forecast_values = fit.forecast(7)
    df_forecast = pd.DataFrame({'date': future_dates, 'submeter': sub, 'forecast': forecast_values.values})
    daily_forecast_list.append(df_forecast)

daily_forecast = pd.concat(daily_forecast_list, ignore_index=True)

# ----------------------------
# 3b. Hourly forecast for next 24 hours (simple averages)
# ----------------------------
data['hour'] = data['time'].dt.components.hours
hourly_forecast_list = []
last_day = data['date'].max()

for sub in ['Sub_metering_1','Sub_metering_2','Sub_metering_3']:
    avg_hour = data.groupby('hour')[sub].mean().reset_index()
    avg_hour['datetime'] = [pd.Timestamp(last_day + timedelta(days=1)) + pd.Timedelta(hours=h) for h in avg_hour['hour']]
    avg_hour = avg_hour.rename(columns={sub:'avg_energy'})
    avg_hour['submeter'] = sub
    hourly_forecast_list.append(avg_hour[['submeter','hour','avg_energy','datetime']])

hourly_forecast = pd.concat(hourly_forecast_list, ignore_index=True)

# ----------------------------
# 4a. Daily peak/low per submeter
# ----------------------------
daily_peak_low = daily_forecast.groupby('submeter')['forecast'].agg(peak='max', low='min').reset_index()

# ----------------------------
# 4b. Hourly peak/low for next 24 hours
# ----------------------------
hourly_peak_low_list = []
for sub in ['Sub_metering_1','Sub_metering_2','Sub_metering_3']:
    sub_df = hourly_forecast[hourly_forecast['submeter']==sub]
    peak_idx = sub_df['avg_energy'].idxmax()
    low_idx = sub_df['avg_energy'].idxmin()
    hourly_peak_low_list.append({
        'submeter': sub,
        'peak_hour': int(sub_df.loc[peak_idx,'hour']),
        'peak_value': sub_df.loc[peak_idx,'avg_energy'],
        'low_hour': int(sub_df.loc[low_idx,'hour']),
        'low_value': sub_df.loc[low_idx,'avg_energy']
    })

hourly_peak_low = pd.DataFrame(hourly_peak_low_list)

# ----------------------------
# 4c. Day-of-week average energy for historical data
# ----------------------------
data['weekday'] = data['date'].dt.day_name()
weekday_energy_list = []

for sub in ['Sub_metering_1','Sub_metering_2','Sub_metering_3']:
    avg_wk = daily_ts[['date', sub]].copy()
    avg_wk['weekday'] = avg_wk['date'].dt.day_name()
    avg_day = avg_wk.groupby('weekday')[sub].mean().reset_index()
    peak_day = avg_day.loc[avg_day[sub].idxmax(),'weekday']
    low_day = avg_day.loc[avg_day[sub].idxmin(),'weekday']
    weekday_energy_list.append({'submeter': sub, 'peak_day': peak_day, 'low_day': low_day})

weekday_energy = pd.DataFrame(weekday_energy_list)

# ----------------------------
# 5. Outputs
# ----------------------------
print("Daily Forecast:\n", daily_forecast)
print("Daily Peak/Low:\n", daily_peak_low)
print("Hourly Forecast:\n", hourly_forecast)
print("Hourly Peak/Low:\n", hourly_peak_low)
print("Weekday Peak/Low:\n", weekday_energy)