import BottomNavigation from '@/components/BottomNavigation';
import { COLORS } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function CurrencyDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { code, base, rate } = params;
  const [selectedPeriod, setSelectedPeriod] = useState('HAFTA');

  // Rate zaten TRY karşılığı olarak geliyor (index.tsx'ten)
  const currentRate = parseFloat(rate as string);

  // Simulated historical data
  const [chartData, setChartData] = useState({
    labels: ['28.12', '29.12', '30.12', '31.12', '01.01'],
    datasets: [{
      data: [
        currentRate * 0.985,
        currentRate * 0.988,
        currentRate * 0.995,
        currentRate * 1.002,
        currentRate,
      ]
    }]
  });

  const weekLow = Math.min(...chartData.datasets[0].data);
  const weekHigh = Math.max(...chartData.datasets[0].data);
  const openRate = chartData.datasets[0].data[0];
  const prevClose = chartData.datasets[0].data[chartData.datasets[0].data.length - 2];
  const change = ((currentRate - prevClose) / prevClose) * 100;

  const getCurrencyInfo = (currencyCode: string) => {
    const currencies: { [key: string]: { name: string; flag: string } } = {
      'TRY': { name: 'Türk Lirası', flag: '🇹🇷' },
      'USD': { name: 'Amerikan Doları', flag: '🇺🇸' },
      'EUR': { name: 'Euro', flag: '🇪🇺' },
      'GBP': { name: 'İngiliz Sterlini', flag: '🇬🇧' },
      'JPY': { name: 'Japon Yeni', flag: '🇯🇵' },
      'CHF': { name: 'İsviçre Frangı', flag: '🇨🇭' },
      'AUD': { name: 'Avustralya Doları', flag: '🇦🇺' },
      'CAD': { name: 'Kanada Doları', flag: '🇨🇦' },
      'SAR': { name: 'Suudi Arabistan Riyali', flag: '🇸🇦' },
    };
    return currencies[currencyCode] || { name: currencyCode, flag: '💱' };
  };

  const info = getCurrencyInfo(code as string);

  const periods = ['GÜN', 'HAFTA', 'AY', '6 AY', 'YIL', '5 YIL', 'MAX'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#0D47A1', '#1565C0', '#1976D2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NOMISMA</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity>
            <Text style={styles.headerIcon}>↗️</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.headerIcon}>➕</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Currency Info */}
        <View style={styles.currencyInfo}>
          <Text style={styles.currencyCode}>{code}</Text>
          <Text style={styles.currencyName}>{info.name}</Text>
        </View>

        {/* Current Rate */}
        <View style={styles.rateContainer}>
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>1 {code} = </Text>
            <Text style={styles.currentRate}>{currentRate.toFixed(4)}</Text>
            <Text style={styles.rateCurrency}> TRY</Text>
          </View>
          <View style={styles.changeContainer}>
            <Text style={[styles.changeText, change >= 0 ? styles.positive : styles.negative]}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
            </Text>
          </View>
        </View>

        {/* Chart */}
        <View style={styles.chartContainer}>
          <LineChart
            data={chartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: COLORS.white,
              backgroundGradientFrom: COLORS.white,
              backgroundGradientTo: COLORS.white,
              decimalPlaces: 4,
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '0',
              },
              propsForBackgroundLines: {
                strokeDasharray: '',
                stroke: '#e0e0e0',
                strokeWidth: 1,
              },
            }}
            bezier
            style={styles.chart}
            withInnerLines={true}
            withOuterLines={true}
            withVerticalLines={false}
            withHorizontalLines={true}
            segments={4}
          />
          
          {/* Chart Labels */}
          <View style={styles.chartLabels}>
            <View style={styles.chartLabel}>
              <Text style={styles.chartLabelValue}>{weekHigh.toFixed(4)}</Text>
              <View style={styles.chartLabelBadge}>
                <Text style={styles.chartLabelBadgeText}>{currentRate.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.chartLabel}>
              <Text style={styles.chartLabelValue}>{weekLow.toFixed(4)}</Text>
            </View>
          </View>
        </View>

        {/* Period Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.periodSelector}
          contentContainerStyle={styles.periodSelectorContent}
        >
          {periods.map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period && styles.periodButtonTextActive
              ]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>HAFTALIK</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>EN YÜKSEK</Text>
              <Text style={styles.statValue}>{weekHigh.toFixed(4)}</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>EN DÜŞÜK</Text>
              <Text style={styles.statValue}>{weekLow.toFixed(4)}</Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>AÇILIŞ</Text>
              <Text style={styles.statValue}>{openRate.toFixed(4)}</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>ÖNCEKİ KAPANIŞ</Text>
              <Text style={styles.statValue}>{prevClose.toFixed(4)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

              <BottomNavigation />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingTop: 45,
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
  },
  backIcon: {
    fontSize: 28,
    color: COLORS.white,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.white,
    letterSpacing: 6,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 15,
  },
  headerIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  currencyInfo: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  currencyCode: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  currencyName: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  rateContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    alignItems: 'baseline',
  },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  rateLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  currentRate: {
    fontSize: 42,
    fontWeight: '700',
    color: COLORS.text,
  },
  rateCurrency: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  changeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  changeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  positive: {
    color: '#4CAF50',
  },
  negative: {
    color: '#F44336',
  },
  chartContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    position: 'relative',
  },
  chart: {
    borderRadius: 16,
  },
  chartLabels: {
    position: 'absolute',
    right: 30,
    top: 20,
    bottom: 40,
    justifyContent: 'space-between',
  },
  chartLabel: {
    alignItems: 'flex-end',
  },
  chartLabelValue: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  chartLabelBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
  },
  chartLabelBadgeText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: '600',
  },
  periodSelector: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  periodSelectorContent: {
    gap: 10,
  },
  periodButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
  },
  periodButtonActive: {
    backgroundColor: COLORS.primary,
  },
  periodButtonText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  periodButtonTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  statsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 15,
    letterSpacing: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 12,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
});
