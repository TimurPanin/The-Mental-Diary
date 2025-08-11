import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Target,
  Activity,
  Heart,
  Zap,
  AlertTriangle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { theme } from '../styles/theme';
import { AnalyticsData } from '../types';

const AnalyticsContainer = styled(motion.div)`
  background: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing[6]};
  box-shadow: ${theme.shadows.lg};
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  margin-bottom: ${theme.spacing[8]};
`;

const HeaderIcon = styled(BarChart3)`
  width: 32px;
  height: 32px;
  color: ${theme.colors.primary[600]};
`;

const Title = styled.h2`
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing[6]};
  margin-bottom: ${theme.spacing[8]};
`;

const StatCard = styled(motion.div)`
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing[6]};
  border: 1px solid ${theme.colors.border.light};
  transition: all ${theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  margin-bottom: ${theme.spacing[4]};
`;

const StatIcon = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.lg};
  background: ${props => props.color}20;
  color: ${props => props.color};
`;

const StatInfo = styled.div`
  flex: 1;
`;

const StatLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.tertiary};
  margin-bottom: ${theme.spacing[1]};
`;

const StatValue = styled.div`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.text.primary};
  line-height: 1;
`;

const StatDescription = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin-top: ${theme.spacing[2]};
`;

const ChartSection = styled.div`
  margin-bottom: ${theme.spacing[8]};
`;

const ChartTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[4]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`;

const ChartContainer = styled.div`
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing[6]};
  border: 1px solid ${theme.colors.border.light};
  height: 400px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing[12]};
  color: ${theme.colors.text.tertiary};
`;

const EmptyIcon = styled(BarChart3)`
  width: 64px;
  height: 64px;
  margin: 0 auto ${theme.spacing[4]};
  color: ${theme.colors.border.medium};
`;

const EmptyTitle = styled.h3`
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[2]};
`;

const EmptyText = styled.p`
  color: ${theme.colors.text.tertiary};
  max-width: 400px;
  margin: 0 auto;
`;

interface AnalyticsProps {
  data: AnalyticsData | null;
}

const Analytics: React.FC<AnalyticsProps> = ({ data }) => {
  if (!data || data.totalEntries === 0) {
    return (
      <AnalyticsContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <EmptyState>
          <EmptyIcon />
          <EmptyTitle>Аналитика пока недоступна</EmptyTitle>
          <EmptyText>
            Создайте несколько записей в дневнике, чтобы увидеть аналитику и графики
          </EmptyText>
        </EmptyState>
      </AnalyticsContainer>
    );
  }

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return theme.colors.success[500];
    if (mood >= 6) return theme.colors.warning[500];
    return theme.colors.error[500];
  };

  const getEnergyColor = (energy: number) => {
    if (energy >= 8) return theme.colors.success[500];
    if (energy >= 6) return theme.colors.warning[500];
    return theme.colors.error[500];
  };

  const getStressColor = (stress: number) => {
    if (stress <= 3) return theme.colors.success[500];
    if (stress <= 6) return theme.colors.warning[500];
    return theme.colors.error[500];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
  };

  return (
    <AnalyticsContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header>
        <HeaderIcon />
        <Title>Аналитика настроения</Title>
      </Header>

      <StatsGrid>
        <StatCard
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <StatHeader>
            <StatIcon color={theme.colors.primary[600]}>
              <Heart size={24} />
            </StatIcon>
            <StatInfo>
              <StatLabel>Среднее настроение</StatLabel>
              <StatValue>{data.averageMood.toFixed(1)}</StatValue>
              <StatDescription>из 10 возможных</StatDescription>
            </StatInfo>
          </StatHeader>
        </StatCard>

        <StatCard
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <StatHeader>
            <StatIcon color={theme.colors.warning[600]}>
              <Zap size={24} />
            </StatIcon>
            <StatInfo>
              <StatLabel>Средняя энергия</StatLabel>
              <StatValue>{data.averageEnergy.toFixed(1)}</StatValue>
              <StatDescription>из 10 возможных</StatDescription>
            </StatInfo>
          </StatHeader>
        </StatCard>

        <StatCard
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <StatHeader>
            <StatIcon color={theme.colors.error[600]}>
              <AlertTriangle size={24} />
            </StatIcon>
            <StatInfo>
              <StatLabel>Средний стресс</StatLabel>
              <StatValue>{data.averageStress.toFixed(1)}</StatValue>
              <StatDescription>из 10 возможных</StatDescription>
            </StatInfo>
          </StatHeader>
        </StatCard>

        <StatCard
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <StatHeader>
            <StatIcon color={theme.colors.success[600]}>
              <Target size={24} />
            </StatIcon>
            <StatInfo>
              <StatLabel>Дней подряд</StatLabel>
              <StatValue>{data.streakDays}</StatValue>
              <StatDescription>записей в дневнике</StatDescription>
            </StatInfo>
          </StatHeader>
        </StatCard>
      </StatsGrid>

      <ChartSection>
        <ChartTitle>
          <TrendingUp size={24} />
          Тренд настроения за последние 30 дней
        </ChartTitle>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.moodTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border.light} />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke={theme.colors.text.tertiary}
                fontSize={12}
              />
              <YAxis 
                stroke={theme.colors.text.tertiary}
                fontSize={12}
                domain={[0, 10]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme.colors.background.primary,
                  border: `1px solid ${theme.colors.border.medium}`,
                  borderRadius: theme.borderRadius.lg,
                }}
                labelFormatter={formatDate}
              />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke={theme.colors.primary[600]} 
                strokeWidth={3}
                dot={{ fill: theme.colors.primary[600], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: theme.colors.primary[600], strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke={theme.colors.warning[600]} 
                strokeWidth={2}
                dot={{ fill: theme.colors.warning[600], strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: theme.colors.warning[600], strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="stress" 
                stroke={theme.colors.error[600]} 
                strokeWidth={2}
                dot={{ fill: theme.colors.error[600], strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: theme.colors.error[600], strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartSection>

      <ChartSection>
        <ChartTitle>
          <Activity size={24} />
          Распределение настроения
        </ChartTitle>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.moodTrend.slice(-7)}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border.light} />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke={theme.colors.text.tertiary}
                fontSize={12}
              />
              <YAxis 
                stroke={theme.colors.text.tertiary}
                fontSize={12}
                domain={[0, 10]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme.colors.background.primary,
                  border: `1px solid ${theme.colors.border.medium}`,
                  borderRadius: theme.borderRadius.lg,
                }}
                labelFormatter={formatDate}
              />
              <Bar 
                dataKey="mood" 
                fill={theme.colors.primary[600]}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartSection>
    </AnalyticsContainer>
  );
};

export default Analytics;
