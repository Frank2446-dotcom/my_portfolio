# Load necessary libraries
library(ggplot2)
library(dplyr)
library(gt)
library(forecast)
library(psych)
library(tibble)  # For row-names_to_column
library(zoo) #viewer Spreadsheet Stylish
library(tseries) # For additional time series tests




# Load dataset
data("AirPassengers")
ap <- AirPassengers



# Convert the time series to a data frame
ap_df <- data.frame(
  YearMonth = as.Date(as.yearmon(time(ap)), format = "%Y-%m"),
  Passengers = as.numeric(ap)
)

# View the first few rows of the data frame
head(ap_df)

# Open the data frame in a spreadsheet-style viewer
View(ap_df)







#ARIMA MODEL FORECASTING

# Convert data to a time series object
ts_data <- ts(ap_df$Passengers, frequency = 12, start = c(1949, 1))

# Fit an ARIMA model to the time series data
arima_model <- auto.arima(ts_data)

# Display the summary of the ARIMA model
summary(arima_model)

# Forecast the next 12 months using the ARIMA model
forecast_values <- forecast(arima_model, h = 12)  

# Plot the forecast
forecast_plot <- autoplot(forecast_values) + 
  ggtitle("ARIMA Model Forecast") + 
  xlab("Time") + 
  ylab("Number of Passengers")

# Print the forecast plot
print(forecast_plot)















# Descriptive Statistics
summary_stats <- data.frame(
  Statistic = c("Min", "1st Qu.", "Median", "Mean", "3rd Qu.", "Max"),
  Value = as.numeric(summary(ap))
)
summary_table <- gt(summary_stats)

# Normality Test
shapiro_test <- shapiro.test(as.numeric(ap))
shapiro_table <- data.frame(
  Statistic = "Shapiro-Wilk",
  W = shapiro_test$statistic,
  p_value = shapiro_test$p.value
) %>% gt()

# t-Test
period1 <- window(ap, start = c(1949, 1), end = c(1954, 12))
period2 <- window(ap, start = c(1955, 1), end = c(1960, 12))
t_test <- t.test(as.numeric(period1), as.numeric(period2))
t_test_table <- data.frame(
  Statistic = "t-Test",
  t = t_test$statistic,
  p_value = t_test$p.value,
  Mean_Difference = t_test$estimate[1] - t_test$estimate[2]
) %>% gt()

# ANOVA
year <- rep(1949:1960, each = 12)
yearly <- data.frame(year = year, passengers = as.numeric(ap))
anova_result <- aov(passengers ~ factor(year), data = yearly)
anova_table <- data.frame(
  Statistic = "ANOVA",
  F_value = summary(anova_result)[[1]][["F value"]][1],
  p_value = summary(anova_result)[[1]][["Pr(>F)"]][1]
) %>% gt()

# Correlation Test
time <- 1:length(ap)
correlation_test <- cor.test(time, as.numeric(ap))
correlation_table <- data.frame(
  Statistic = "Pearson Correlation",
  r = correlation_test$estimate,
  p_value = correlation_test$p.value
) %>% gt()

# Regression Analysis
regression_model <- lm(as.numeric(ap) ~ time)
regression_table <- summary(regression_model)$coefficients %>% 
  as.data.frame() %>% 
  rownames_to_column(var = "Term") %>% 
  gt()

# Non-Parametric Test
wilcoxon_test <- wilcox.test(as.numeric(period1), as.numeric(period2))
wilcoxon_table <- data.frame(
  Statistic = "Wilcoxon Rank-Sum Test",
  W = wilcoxon_test$statistic,
  p_value = wilcoxon_test$p.value
) %>% gt()

# Time Series Analysis
ts_decompose <- decompose(ap)
ts_decompose_table <- data.frame(
  Component = c("Trend", "Seasonal", "Random"),
  Variance_Explained = c(var(ts_decompose$trend, na.rm = TRUE), 
                         var(ts_decompose$seasonal), 
                         var(ts_decompose$random, na.rm = TRUE))
) %>% gt()

# Plotting
# Colors
hist_color <- "#1f77b4"
boxplot_color <- "#ff7f0e"
scatter_color <- "#2ca02c"
regression_color <- "#d62728"
line_color <- "#9467bd"

# Histograms
# Histograms
hist_plot <- ggplot(yearly, aes(x = passengers)) + 
  geom_histogram(aes(y = ..density..), binwidth = 20, fill = hist_color, color = "black", alpha = 0.7) + 
  geom_density(color = line_color, size = 1) +
  theme_minimal() + 
  ggtitle("Histogram of AirPassengers") + 
  xlab("Number of Passengers") + 
  ylab("Density")


# Boxplots
box_plot <- ggplot(yearly, aes(y = passengers)) + 
  geom_boxplot(fill = boxplot_color, color = "black") + 
  theme_minimal() + 
  ggtitle("Boxplot of AirPassengers") + 
  ylab("Number of Passengers")

# Scatter Plots
scatter_plot <- ggplot(yearly, aes(x = year, y = passengers)) + 
  geom_point(color = scatter_color) + 
  geom_smooth(method = "lm", color = regression_color, size = 1) + 
  theme_minimal() + 
  ggtitle("Scatter Plot of AirPassengers over Years") + 
  xlab("Year") + 
  ylab("Number of Passengers")

# Time Series Plots
ts_plot <- autoplot(ap) + 
  theme_minimal() + 
  ggtitle("Time Series Plot of AirPassengers") + 
  xlab("Time") + 
  ylab("Number of Passengers")

# Regression Line
regression_plot <- ggplot(yearly, aes(x = time, y = passengers)) + 
  geom_point(color = scatter_color) + 
  geom_smooth(method = "lm", color = regression_color, size = 1) + 
  theme_minimal() + 
  ggtitle("Regression Line of AirPassengers") + 
  xlab("Time") + 
  ylab("Number of Passengers")

# Display results and plots
print(summary_table)
print(shapiro_table)
print(t_test_table)
print(anova_table)
print(correlation_table)
print(regression_table)
print(wilcoxon_table)
print(ts_decompose_table)

print(hist_plot)
print(box_plot)
print(scatter_plot)
print(ts_plot)
print(regression_plot)
