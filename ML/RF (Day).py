import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

# 1. Load data
df = pd.read_excel("household_power_cleaned.xlsx")
df['datetime'] = pd.to_datetime(df['Date'] + ' ' + df['Time'], dayfirst=True)
df = df.set_index('datetime')
df['Global_active_power'] = pd.to_numeric(df['Global_active_power'], errors='coerce')
df = df.dropna(subset=['Global_active_power'])

# 2. Resample to daily mean
daily_df = df['Global_active_power'].resample('D').mean().to_frame()

# 3. Feature engineering
daily_df['day_of_week'] = daily_df.index.weekday
daily_df['month'] = daily_df.index.month

# Create lag features (past 7 days)
for lag in range(1, 8):
    daily_df[f'lag_{lag}'] = daily_df['Global_active_power'].shift(lag)

daily_df = daily_df.dropna()

# 4. Train-test split
X = daily_df.drop('Global_active_power', axis=1)
y = daily_df['Global_active_power']

split = int(len(X) * 0.8)
X_train, X_test = X.iloc[:split], X.iloc[split:]
y_train, y_test = y.iloc[:split], y.iloc[split:]

# 5. Train Random Forest
model = RandomForestRegressor(n_estimators=300, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
print("MAE:", mae)

# 6. Predict next 7 days
last_row = daily_df.iloc[-1:].copy()
future_predictions = []
future_dates = []

for i in range(1, 8):
    next_date = daily_df.index[-1] + pd.Timedelta(days=i)
    future_dates.append(next_date)

    new_row = last_row.copy()
    for lag in range(1, 8):
        if lag == 1:
            new_row[f'lag_{lag}'] = last_row['Global_active_power'].values[0]
        else:
            new_row[f'lag_{lag}'] = last_row[f'lag_{lag - 1}'].values[0]

    new_row['day_of_week'] = next_date.weekday()
    new_row['month'] = next_date.month

    # Predict
    pred = model.predict(new_row.drop('Global_active_power', axis=1))[0]
    future_predictions.append(pred)

    new_row['Global_active_power'] = pred
    last_row = new_row.copy()

# Build forecast dataframe
forecast_df = pd.DataFrame({
    'Date': future_dates,
    'Predicted_Daily_Power': future_predictions
})

print("\nNext 7 days forecast:")
print(forecast_df)

# 7. Lowest & highest prediction
min_idx = np.argmin(future_predictions)
max_idx = np.argmax(future_predictions)

lowest_day = forecast_df.iloc[min_idx]
highest_day = forecast_df.iloc[max_idx]

print(f"\nLowest predicted energy: {lowest_day['Predicted_Daily_Power']:.3f} on {lowest_day['Date'].strftime('%Y-%m-%d')}")
print(f"Highest predicted energy: {highest_day['Predicted_Daily_Power']:.3f} on {highest_day['Date'].strftime('%Y-%m-%d')}")

# 8. Best day to consume electricity
best_day = lowest_day['Date']
print(f"\nBest day to consume electricity: {best_day.strftime('%Y-%m-%d')} (Lowest predicted usage)")

# 9. Weekly historical consumption (Mon–Sun)
daily_df['weekday_name'] = daily_df.index.day_name()

weekday_summary = (
    daily_df.groupby('weekday_name')['Global_active_power']
    .mean()
    .reindex(['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'])
)

print("\nAverage energy consumption by weekday:")
print(weekday_summary)

# Find lowest & highest weekday consumption
lowest_wkday = weekday_summary.idxmin()
highest_wkday = weekday_summary.idxmax()

print(f"\nLowest historical weekday consumption: {lowest_wkday} ({weekday_summary.min():.3f})")
print(f"Highest historical weekday consumption: {highest_wkday} ({weekday_summary.max():.3f})")
print(f"Best weekday to consume energy historically: {lowest_wkday}")