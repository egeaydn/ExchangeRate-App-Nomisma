import { COLORS } from '@/constants/theme';
import { fetchExchangeRates } from '@/services/api';
import { ExchangeRates } from '@/types/currency';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [baseCurrency, setBaseCurrency] = useState('TRY');
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const currencies = [
    { code: 'TRY', name: 'Türk Lirası', flag: '🇹🇷' },
    { code: 'USD', name: 'Amerikan Doları', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'İngiliz Sterlini', flag: '🇬🇧' },
    { code: 'JPY', name: 'Japon Yeni', flag: '🇯🇵' },
    { code: 'CHF', name: 'İsviçre Frangı', flag: '🇨🇭' },
    { code: 'AUD', name: 'Avustralya Doları', flag: '🇦🇺' },
    { code: 'CAD', name: 'Kanada Doları', flag: '🇨🇦' },
    { code: 'SAR', name: 'Suudi Arabistan Riyali', flag: '🇸🇦' },
  ];

  useEffect(() => {
    loadRates();
  }, [baseCurrency]);

  const loadRates = async () => {
    try {
      setLoading(true);
      const data = await fetchExchangeRates(baseCurrency);
      setRates(data);
      setLastUpdate(new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));
    } catch (error) {
      console.error('Error loading rates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrencyPress = (code: string) => {
    if (rates && rates.rates[code]) {
      router.push(`/currency-detail?code=${code}&base=${baseCurrency}&rate=${rates.rates[code]}`);
    }
  };

  const getCurrencyInfo = (code: string) => {
    return currencies.find(c => c.code === code) || { code, name: code, flag: '💱' };
  };

  if (loading && !rates) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HAREM</Text>
        <TouchableOpacity onPress={loadRates}>
          <Text style={styles.refreshIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Top Rates Slider */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topRatesScroll}>
        {rates && Object.entries(rates.rates).slice(0, 5).map(([code, rate]) => {
          const info = getCurrencyInfo(code);
          const change = Math.random() * 2 - 1; // Simulated change
          return (
            <View key={code} style={styles.topRateCard}>
              <Text style={styles.topRateCode}>{code}TRY</Text>
              <Text style={styles.topRateValue}>{typeof rate === 'number' ? rate.toFixed(3).replace('.', ',') : rate}</Text>
              <Text style={[styles.topRateChange, change > 0 ? styles.positive : styles.negative]}>
                %{change > 0 ? '+' : ''}{change.toFixed(2)}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        <TouchableOpacity style={[styles.filterTab, styles.filterTabActive]}>
          <Text style={styles.filterTabTextActive}>Birim ⬇️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab}>
          <Text style={styles.filterTabText}>Alış</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab}>
          <Text style={styles.filterTabText}>Satış</Text>
        </TouchableOpacity>
      </View>

      {/* Currency List */}
      <ScrollView style={styles.currencyList}>
        {rates && Object.entries(rates.rates).map(([code, rate]) => {
          const info = getCurrencyInfo(code);
          const buyRate = typeof rate === 'number' ? rate * 0.995 : parseFloat(rate) * 0.995;
          const sellRate = typeof rate === 'number' ? rate * 1.005 : parseFloat(rate) * 1.005;
          const change = Math.random() * 2 - 1; // Simulated change
          
          return (
            <TouchableOpacity 
              key={code} 
              style={styles.currencyCard}
              onPress={() => handleCurrencyPress(code)}
            >
              <View style={styles.currencyLeft}>
                <Text style={styles.currencyFlag}>{info.flag}</Text>
                <View>
                  <Text style={styles.currencyCode}>{code}</Text>
                  <Text style={styles.currencyName}>{info.name}</Text>
                </View>
              </View>
              
              <View style={styles.currencyCenter}>
                <Text style={styles.updateTime}>⏰ {lastUpdate}</Text>
              </View>
              
              <View style={styles.currencyRight}>
                <View style={styles.rateBox}>
                  <Text style={styles.rateValue}>{buyRate.toFixed(4)}</Text>
                </View>
                <View style={styles.rateBox}>
                  <Text style={styles.rateValue}>{sellRate.toFixed(4)}</Text>
                  <Text style={[styles.changePercent, change > 0 ? styles.positive : styles.negative]}>
                    {change > 0 ? '↑' : '↓'}{Math.abs(change).toFixed(2)}%
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <Text style={[styles.navIcon, styles.navActive]}>🌍</Text>
          <Text style={[styles.navText, styles.navActive]}>Döviz</Text>
        </View>
        <View style={styles.navItem}>
          <Text style={styles.navIcon}>🏦</Text>
          <Text style={styles.navText}>Altın</Text>
        </View>
        <View style={styles.navItem}>
          <Text style={styles.navIcon}>🔄</Text>
          <Text style={styles.navText}>Çevirici</Text>
        </View>
        <View style={styles.navItem}>
          <Text style={styles.navIcon}>💼</Text>
          <Text style={styles.navText}>Portföy</Text>
        </View>
        <View style={styles.navItem}>
          <Text style={styles.navIcon}>🛒</Text>
          <Text style={styles.navText}>Çarşı</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 28,
    color: COLORS.white,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '400',
    color: COLORS.white,
    letterSpacing: 8,
  },
  refreshIcon: {
    fontSize: 24,
  },
  topRatesScroll: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  topRateCard: {
    marginRight: 30,
    alignItems: 'flex-start',
  },
  topRateCode: {
    fontSize: 11,
    color: COLORS.white,
    opacity: 0.7,
    marginBottom: 3,
  },
  topRateValue: {
    fontSize: 22,
    fontWeight: '400',
    color: COLORS.white,
    marginBottom: 2,
  },
    fontWeight: 'bold',
    color: COLORS.white,
    marginVertical: 4,
  },
  topRateChange: {
    fontSize: 11,
    fontWeight: '400',
  },
  positive: {
    color: '#4CAF50',
  },
  negative: {
    color: '#F44336',
  },
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.cardBackground,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    },
  filterTabActive: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    
  },
  filterTabText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  filterTabTextActive: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  currencyList: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
  },
  currencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    
  },
  currencyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  currencyFlag: {
    fontSize: 28,
    marginRight: 12,
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  currencyName: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  currencyCenter: {
    alignItems: 'center',
  },
  updateTime: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  currencyRight: {
    flexDirection: 'row',
    gap: 8,
  },
  rateBox: {
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    minWidth: 75,
  },
  rateValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
  },
  changePercent: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    opacity: 0.5,
  },
  navText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  navActive: {
    opacity: 1,
    color: COLORS.primary,
  },
});
