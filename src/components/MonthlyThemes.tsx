import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  CheckCircle, 
  Circle, 
  Target, 
  Clock, 
  Star,
  ArrowRight,
  Plus
} from 'lucide-react';
import { MonthlyTheme, ThemeTask } from '../types';
import { theme } from '../styles/theme';
import { getAvailableThemes } from '../utils/timerUtils';
import { MONTHLY_THEMES } from '../constants';

const ThemesContainer = styled.div`
  padding: ${theme.spacing[6]};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  margin-bottom: ${theme.spacing[6]};
`;

const HeaderIcon = styled(Calendar)`
  color: ${theme.colors.primary[600]};
  width: 32px;
  height: 32px;
`;

const Title = styled.h1`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

const ThemesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing[6]};
  margin-bottom: ${theme.spacing[8]};
`;

const ThemeCard = styled(motion.div)<{ isActive?: boolean }>`
  background: ${theme.colors.background.primary};
  border: 2px solid ${props => props.isActive ? theme.colors.primary[500] : theme.colors.border.medium};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing[6]};
  transition: all ${theme.transitions.fast};
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primary[400]};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const ThemeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  margin-bottom: ${theme.spacing[4]};
`;

const ThemeIcon = styled.div`
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.full};
  background: ${props => props.color}20;
  color: ${props => props.color};
`;

const ThemeInfo = styled.div`
  flex: 1;
`;

const ThemeTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing[1]} 0;
`;

const ThemeDescription = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.text.secondary};
  margin: 0;
  line-height: 1.5;
`;

const ThemeMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[4]};
  margin-top: ${theme.spacing[3]};
  padding-top: ${theme.spacing[3]};
  border-top: 1px solid ${theme.colors.border.light};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
`;

const ActiveBadge = styled.div`
  background: ${theme.colors.primary[500]};
  color: ${theme.colors.text.inverse};
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
`;

const TasksSection = styled.div`
  margin-top: ${theme.spacing[8]};
`;

const TasksTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[4]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`;

const TasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[3]};
`;

const TaskItem = styled(motion.div)`
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.medium};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[4]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.primary[400]};
    background: ${theme.colors.primary[50]};
  }
`;

const TaskCheckbox = styled.button<{ completed: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: ${theme.borderRadius.full};
  border: 2px solid ${props => props.completed ? theme.colors.success[500] : theme.colors.border.medium};
  background: ${props => props.completed ? theme.colors.success[500] : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.primary[500]};
  }
`;

const TaskContent = styled.div`
  flex: 1;
`;

const TaskTitle = styled.h4<{ completed: boolean }>`
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.medium};
  color: ${props => props.completed ? theme.colors.text.secondary : theme.colors.text.primary};
  margin: 0 0 ${theme.spacing[1]} 0;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`;

const TaskDescription = styled.p<{ completed: boolean }>`
  font-size: ${theme.fontSizes.sm};
  color: ${props => props.completed ? theme.colors.text.secondary : theme.colors.text.secondary};
  margin: 0;
  line-height: 1.4;
`;

const TaskType = styled.span<{ type: string }>`
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.medium};
  background: ${props => {
    switch (props.type) {
      case 'daily': return theme.colors.primary[100];
      case 'weekly': return theme.colors.secondary[100];
      case 'one_time': return theme.colors.warning[100];
      default: return theme.colors.neutral[100];
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'daily': return theme.colors.primary[700];
      case 'weekly': return theme.colors.secondary[700];
      case 'one_time': return theme.colors.warning[700];
      default: return theme.colors.neutral[700];
    }
  }};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing[12]};
  color: ${theme.colors.text.secondary};
`;

const EmptyIcon = styled(Star)`
  width: 64px;
  height: 64px;
  margin: 0 auto ${theme.spacing[4]} auto;
  color: ${theme.colors.neutral[400]};
`;

const EmptyTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  margin: 0 0 ${theme.spacing[2]} 0;
`;

const EmptyText = styled.p`
  font-size: ${theme.fontSizes.base};
  margin: 0;
`;

interface MonthlyThemesProps {
  currentTheme: MonthlyTheme | null;
  onSelectTheme: (themeId: string) => void;
  onCompleteTask: (themeId: string, taskId: string) => void;
  onResetTheme: () => void;
}

const MonthlyThemes: React.FC<MonthlyThemesProps> = ({
  currentTheme,
  onSelectTheme,
  onCompleteTask,
  onResetTheme
}) => {
  const [selectedTheme, setSelectedTheme] = useState<MonthlyTheme | null>(currentTheme);
  const availableThemes = getAvailableThemes();

  const handleThemeSelect = (themeData: typeof availableThemes[0]) => {
    onSelectTheme(themeData.title);
    setSelectedTheme({
      ...themeData,
      id: Date.now().toString(),
      startDate: new Date()
    });
  };

  const handleTaskComplete = (taskId: string) => {
    if (selectedTheme) {
      onCompleteTask(selectedTheme.id, taskId);
      setSelectedTheme({
        ...selectedTheme,
        tasks: selectedTheme.tasks.map(task =>
          task.id === taskId
            ? { ...task, completed: true, completedDate: new Date() }
            : task
        )
      });
    }
  };

  const completedTasksCount = selectedTheme?.tasks.filter(task => task.completed).length || 0;
  const totalTasksCount = selectedTheme?.tasks.length || 0;

  return (
    <ThemesContainer>
      <Header>
        <HeaderIcon />
        <div>
          <Title>Темы месяца</Title>
          <Subtitle>Выберите тему для работы над своим психическим здоровьем</Subtitle>
        </div>
      </Header>

      <ThemesGrid>
        {availableThemes.map((themeData) => (
          <ThemeCard
            key={themeData.title}
            isActive={selectedTheme?.title === themeData.title}
            onClick={() => handleThemeSelect(themeData)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ThemeHeader>
              <ThemeIcon color={themeData.color}>
                {themeData.icon}
              </ThemeIcon>
              <ThemeInfo>
                <ThemeTitle>{themeData.title}</ThemeTitle>
                <ThemeDescription>{themeData.description}</ThemeDescription>
              </ThemeInfo>
              {selectedTheme?.title === themeData.title && (
                <ActiveBadge>Активна</ActiveBadge>
              )}
            </ThemeHeader>
            <ThemeMeta>
              <MetaItem>
                <Target size={16} />
                {themeData.tasks.length} задач
              </MetaItem>
              <MetaItem>
                <Clock size={16} />
                {themeData.duration === 'month' ? '1 месяц' : '1 неделя'}
              </MetaItem>
            </ThemeMeta>
          </ThemeCard>
        ))}
      </ThemesGrid>

      {selectedTheme && (
        <TasksSection>
          <TasksTitle>
            <Target size={24} />
            Задачи: {completedTasksCount}/{totalTasksCount} выполнено
          </TasksTitle>
          
          <TasksList>
            <AnimatePresence>
              {selectedTheme.tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TaskCheckbox
                    completed={task.completed}
                    onClick={() => handleTaskComplete(task.id)}
                  >
                    {task.completed && <CheckCircle size={16} color="white" />}
                  </TaskCheckbox>
                  
                  <TaskContent>
                    <TaskTitle completed={task.completed}>
                      {task.title}
                    </TaskTitle>
                    <TaskDescription completed={task.completed}>
                      {task.description}
                    </TaskDescription>
                  </TaskContent>
                  
                  <TaskType type={task.type}>
                    {task.type === 'daily' ? 'Ежедневно' : 
                     task.type === 'weekly' ? 'Еженедельно' : 'Однократно'}
                  </TaskType>
                </TaskItem>
              ))}
            </AnimatePresence>
          </TasksList>
        </TasksSection>
      )}

      {!selectedTheme && (
        <EmptyState>
          <EmptyIcon />
          <EmptyTitle>Выберите тему месяца</EmptyTitle>
          <EmptyText>
            Выберите одну из предложенных тем, чтобы начать работу над своим психическим здоровьем
          </EmptyText>
        </EmptyState>
      )}
    </ThemesContainer>
  );
};

export default MonthlyThemes;

