import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Heart,
  Brain,
  Zap,
  Target,
  CheckCircle,
  Circle,
  Plus,
  Video,
  BookOpen
} from 'lucide-react';
import { MicroExercise, BreathingExercise } from '../types';
import { theme } from '../styles/theme';
import { getAvailableExercises } from '../utils/timerUtils';
import { MICRO_EXERCISES } from '../constants';

const ExercisesContainer = styled.div`
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

const HeaderIcon = styled(Activity)`
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

const ExercisesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing[6]};
  margin-bottom: ${theme.spacing[8]};
`;

const ExerciseCard = styled(motion.div)`
  background: ${theme.colors.background.primary};
  border: 1px solid ${theme.colors.border.medium};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing[6]};
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.primary[400]};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const ExerciseHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  margin-bottom: ${theme.spacing[4]};
`;

const ExerciseIcon = styled.div<{ type: string }>`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.full};
  background: ${props => {
    switch (props.type) {
      case 'breathing': return theme.colors.primary[100];
      case 'meditation': return theme.colors.secondary[100];
      case 'physical': return theme.colors.success[100];
      case 'mindfulness': return theme.colors.warning[100];
      default: return theme.colors.neutral[100];
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'breathing': return theme.colors.primary[600];
      case 'meditation': return theme.colors.secondary[600];
      case 'physical': return theme.colors.success[600];
      case 'mindfulness': return theme.colors.warning[600];
      default: return theme.colors.neutral[600];
    }
  }};
`;

const ExerciseInfo = styled.div`
  flex: 1;
`;

const ExerciseTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing[1]} 0;
`;

const ExerciseDescription = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.text.secondary};
  margin: 0;
  line-height: 1.5;
`;

const ExerciseMeta = styled.div`
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

const DifficultyBadge = styled.span<{ difficulty: string }>`
  padding: ${theme.spacing[1]} ${theme.spacing[2]};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.medium};
  background: ${props => {
    switch (props.difficulty) {
      case 'easy': return theme.colors.success[100];
      case 'medium': return theme.colors.warning[100];
      case 'hard': return theme.colors.error[100];
      default: return theme.colors.neutral[100];
    }
  }};
  color: ${props => {
    switch (props.difficulty) {
      case 'easy': return theme.colors.success[700];
      case 'medium': return theme.colors.warning[700];
      case 'hard': return theme.colors.error[700];
      default: return theme.colors.neutral[700];
    }
  }};
`;

const ExerciseActions = styled.div`
  display: flex;
  gap: ${theme.spacing[3]};
  margin-top: ${theme.spacing[4]};
`;

const ActionButton = styled(motion.button)<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.fontWeights.medium};
  font-size: ${theme.fontSizes.sm};
  transition: all ${theme.transitions.fast};
  border: 1px solid transparent;
  cursor: pointer;

  ${({ variant = 'secondary' }) =>
    variant === 'primary'
      ? `
        background: ${theme.colors.primary[600]};
        color: ${theme.colors.text.inverse};
        
        &:hover {
          background: ${theme.colors.primary[700]};
          transform: translateY(-1px);
        }
      `
      : `
        background: transparent;
        color: ${theme.colors.text.secondary};
        border-color: ${theme.colors.border.medium};
        
        &:hover {
          background: ${theme.colors.background.secondary};
          border-color: ${theme.colors.primary[400]};
          color: ${theme.colors.primary[600]};
        }
      `}
`;

// Компонент для дыхательного упражнения
const BreathingExerciseComponent: React.FC<{ exercise: BreathingExercise }> = ({ exercise }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(exercise.inhaleTime);
  const [cycle, setCycle] = useState(1);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Переход к следующей фазе
            if (currentPhase === 'inhale') {
              setCurrentPhase('hold');
              return exercise.holdTime;
            } else if (currentPhase === 'hold') {
              setCurrentPhase('exhale');
              return exercise.exhaleTime;
            } else {
              // Завершение цикла
              if (cycle < exercise.cycles) {
                setCycle(prev => prev + 1);
                setCurrentPhase('inhale');
                return exercise.inhaleTime;
              } else {
                // Завершение упражнения
                setIsActive(false);
                setCurrentPhase('inhale');
                setCycle(1);
                return exercise.inhaleTime;
              }
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentPhase, cycle, exercise]);

  const startExercise = () => {
    setIsActive(true);
    setTimeLeft(exercise.inhaleTime);
    setCurrentPhase('inhale');
    setCycle(1);
  };

  const pauseExercise = () => {
    setIsActive(false);
  };

  const resetExercise = () => {
    setIsActive(false);
    setTimeLeft(exercise.inhaleTime);
    setCurrentPhase('inhale');
    setCycle(1);
  };

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'inhale': return 'Вдох';
      case 'hold': return 'Задержка';
      case 'exhale': return 'Выдох';
      default: return '';
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale': return theme.colors.primary[500];
      case 'hold': return theme.colors.warning[500];
      case 'exhale': return theme.colors.secondary[500];
      default: return theme.colors.neutral[500];
    }
  };

  return (
    <ExerciseCard>
      <ExerciseHeader>
        <ExerciseIcon type={exercise.type}>
          <Heart size={24} />
        </ExerciseIcon>
        <ExerciseInfo>
          <ExerciseTitle>{exercise.title}</ExerciseTitle>
          <ExerciseDescription>{exercise.description}</ExerciseDescription>
        </ExerciseInfo>
      </ExerciseHeader>

      <ExerciseMeta>
        <MetaItem>
          <Clock size={16} />
          {exercise.duration} мин
        </MetaItem>
        <MetaItem>
          <Target size={16} />
          {exercise.cycles} циклов
        </MetaItem>
        <DifficultyBadge difficulty={exercise.difficulty}>
          {exercise.difficulty === 'easy' ? 'Легко' : 
           exercise.difficulty === 'medium' ? 'Средне' : 'Сложно'}
        </DifficultyBadge>
      </ExerciseMeta>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            textAlign: 'center',
            padding: theme.spacing[4],
            marginTop: theme.spacing[4],
            background: `${getPhaseColor()}10`,
            border: `2px solid ${getPhaseColor()}`,
            borderRadius: theme.borderRadius.lg
          }}
        >
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: getPhaseColor() }}>
            {getPhaseText()}
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: theme.spacing[2] }}>
            {timeLeft}
          </div>
          <div style={{ color: theme.colors.text.secondary }}>
            Цикл {cycle} из {exercise.cycles}
          </div>
        </motion.div>
      )}

      <ExerciseActions>
        {!isActive ? (
          <ActionButton variant="primary" onClick={startExercise}>
            <Play size={16} />
            Начать
          </ActionButton>
        ) : (
          <>
            <ActionButton onClick={pauseExercise}>
              <Pause size={16} />
              Пауза
            </ActionButton>
            <ActionButton onClick={resetExercise}>
              <RotateCcw size={16} />
              Сброс
            </ActionButton>
          </>
        )}
      </ExerciseActions>
    </ExerciseCard>
  );
};

// Обычный компонент упражнения
const RegularExerciseComponent: React.FC<{ exercise: MicroExercise }> = ({ exercise }) => {
  const [isCompleted, setIsCompleted] = useState(exercise.completed);

  const toggleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  const getTypeIcon = () => {
    switch (exercise.type) {
      case 'breathing': return <Heart size={24} />;
      case 'meditation': return <Brain size={24} />;
      case 'physical': return <Activity size={24} />;
      case 'mindfulness': return <Zap size={24} />;
      default: return <Activity size={24} />;
    }
  };

  return (
    <ExerciseCard>
      <ExerciseHeader>
        <ExerciseIcon type={exercise.type}>
          {getTypeIcon()}
        </ExerciseIcon>
        <ExerciseInfo>
          <ExerciseTitle>{exercise.title}</ExerciseTitle>
          <ExerciseDescription>{exercise.description}</ExerciseDescription>
        </ExerciseInfo>
      </ExerciseHeader>

      <ExerciseMeta>
        <MetaItem>
          <Clock size={16} />
          {exercise.duration} мин
        </MetaItem>
        <DifficultyBadge difficulty={exercise.difficulty}>
          {exercise.difficulty === 'easy' ? 'Легко' : 
           exercise.difficulty === 'medium' ? 'Средне' : 'Сложно'}
        </DifficultyBadge>
      </ExerciseMeta>

      {exercise.instructions && exercise.instructions.length > 0 && (
        <div style={{ marginTop: theme.spacing[4] }}>
          <h4 style={{ margin: `0 0 ${theme.spacing[2]} 0`, color: theme.colors.text.primary }}>
            Инструкции:
          </h4>
          <ol style={{ margin: 0, paddingLeft: theme.spacing[4], color: theme.colors.text.secondary }}>
            {exercise.instructions.map((instruction, index) => (
              <li key={index} style={{ marginBottom: theme.spacing[1] }}>
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      )}

      {exercise.benefits && exercise.benefits.length > 0 && (
        <div style={{ marginTop: theme.spacing[4] }}>
          <h4 style={{ margin: `0 0 ${theme.spacing[2]} 0`, color: theme.colors.text.primary }}>
            Польза:
          </h4>
          <ul style={{ margin: 0, paddingLeft: theme.spacing[4], color: theme.colors.text.secondary }}>
            {exercise.benefits.map((benefit, index) => (
              <li key={index} style={{ marginBottom: theme.spacing[1] }}>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}

      <ExerciseActions>
        <ActionButton
          variant={isCompleted ? 'primary' : 'secondary'}
          onClick={toggleComplete}
        >
          {isCompleted ? <CheckCircle size={16} /> : <Circle size={16} />}
          {isCompleted ? 'Выполнено' : 'Отметить выполненным'}
        </ActionButton>
        
        {exercise.videoUrl && (
          <ActionButton>
            <Video size={16} />
            Видео
          </ActionButton>
        )}
      </ExerciseActions>
    </ExerciseCard>
  );
};

interface MicroExercisesProps {
  exercises: MicroExercise[];
  onAddExercise: (exercise: Omit<MicroExercise, 'id' | 'completed' | 'completedDate'>) => void;
  onCompleteExercise: (exerciseId: string) => void;
  onRemoveExercise: (exerciseId: string) => void;
}

const MicroExercises: React.FC<MicroExercisesProps> = ({
  exercises,
  onAddExercise,
  onCompleteExercise,
  onRemoveExercise
}) => {
  const [showAvailable, setShowAvailable] = useState(false);
  const availableExercises = getAvailableExercises();

  const handleAddExercise = (exerciseData: typeof availableExercises[0]) => {
    onAddExercise(exerciseData);
  };

  return (
    <ExercisesContainer>
      <Header>
        <HeaderIcon />
        <div>
          <Title>Микро-упражнения</Title>
          <Subtitle>Короткие упражнения для улучшения психического здоровья</Subtitle>
        </div>
      </Header>

      <ExerciseActions style={{ marginBottom: theme.spacing[6] }}>
        <ActionButton
          variant="primary"
          onClick={() => setShowAvailable(!showAvailable)}
        >
          <Plus size={16} />
          {showAvailable ? 'Скрыть доступные' : 'Добавить упражнение'}
        </ActionButton>
      </ExerciseActions>

      {showAvailable && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{ marginBottom: theme.spacing[6] }}
        >
          <h3 style={{ marginBottom: theme.spacing[4], color: theme.colors.text.primary }}>
            Доступные упражнения:
          </h3>
          <ExercisesGrid>
            {availableExercises.map((exerciseData) => (
              <ExerciseCard key={exerciseData.title}>
                <ExerciseHeader>
                  <ExerciseIcon type={exerciseData.type}>
                    {exerciseData.type === 'breathing' ? <Heart size={24} /> :
                     exerciseData.type === 'meditation' ? <Brain size={24} /> :
                     exerciseData.type === 'physical' ? <Activity size={24} /> :
                     <Zap size={24} />}
                  </ExerciseIcon>
                  <ExerciseInfo>
                    <ExerciseTitle>{exerciseData.title}</ExerciseTitle>
                    <ExerciseDescription>{exerciseData.description}</ExerciseDescription>
                  </ExerciseInfo>
                </ExerciseHeader>
                <ExerciseMeta>
                  <MetaItem>
                    <Clock size={16} />
                    {exerciseData.duration} мин
                  </MetaItem>
                  <DifficultyBadge difficulty={exerciseData.difficulty}>
                    {exerciseData.difficulty === 'easy' ? 'Легко' : 
                     exerciseData.difficulty === 'medium' ? 'Средне' : 'Сложно'}
                  </DifficultyBadge>
                </ExerciseMeta>
                <ExerciseActions>
                  <ActionButton
                    variant="primary"
                    onClick={() => handleAddExercise(exerciseData)}
                  >
                    <Plus size={16} />
                    Добавить
                  </ActionButton>
                </ExerciseActions>
              </ExerciseCard>
            ))}
          </ExercisesGrid>
        </motion.div>
      )}

      <ExercisesGrid>
        <AnimatePresence>
          {exercises.map((exercise) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {exercise.type === 'breathing' ? (
                <BreathingExerciseComponent exercise={exercise as BreathingExercise} />
              ) : (
                <RegularExerciseComponent exercise={exercise} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </ExercisesGrid>

      {exercises.length === 0 && !showAvailable && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center',
            padding: theme.spacing[12],
            color: theme.colors.text.secondary
          }}
        >
          <BookOpen size={64} style={{ margin: '0 auto 1rem auto', color: theme.colors.neutral[400] }} />
          <h3 style={{ margin: '0 0 0.5rem 0', color: theme.colors.text.primary }}>
            Нет добавленных упражнений
          </h3>
          <p>Добавьте упражнения из списка доступных, чтобы начать практику</p>
        </motion.div>
      )}
    </ExercisesContainer>
  );
};

export default MicroExercises;
