import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Smile, 
  Battery, 
  AlertTriangle, 
  Tag as TagIcon, 
  Send,
  X
} from 'lucide-react';
import { MOOD_OPTIONS, ENERGY_LEVELS, STRESS_LEVELS } from '../constants';
import { theme } from '../styles/theme';
import { MoodType } from '../types';

const JournalEntryContainer = styled(motion.div)`
  background: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing[6]};
  box-shadow: ${theme.shadows.lg};
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  margin-bottom: ${theme.spacing[6]};
`;

const HeaderIcon = styled(BookOpen)`
  width: 24px;
  height: 24px;
  color: ${theme.colors.primary[600]};
`;

const Title = styled.h2`
  color: ${theme.colors.text.primary};
  margin: 0;
`;

const Section = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

const SectionTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[4]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${theme.spacing[4]};
  border: 1px solid ${theme.colors.border.medium};
  border-radius: ${theme.borderRadius.lg};
  font-family: inherit;
  font-size: ${theme.fontSizes.base};
  line-height: ${theme.lineHeights.relaxed};
  resize: vertical;
  transition: all ${theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
  }

  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }
`;

const MoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${theme.spacing[3]};
  margin-bottom: ${theme.spacing[4]};
`;

const MoodButton = styled(motion.button)<{ selected?: boolean; color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[4]};
  border: 2px solid ${props => props.selected ? props.color : theme.colors.border.medium};
  border-radius: ${theme.borderRadius.lg};
  background: ${props => props.selected ? `${props.color}10` : theme.colors.background.primary};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${props => props.color};
    background: ${props => props.color}10;
    transform: translateY(-2px);
  }
`;

const MoodEmoji = styled.span`
  font-size: ${theme.fontSizes['2xl']};
`;

const MoodLabel = styled.span`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.secondary};
  text-align: center;
`;

const SliderContainer = styled.div`
  margin-bottom: ${theme.spacing[4]};
`;

const SliderLabel = styled.label`
  display: block;
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[2]};
`;

const Slider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.border.light};
  outline: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: ${theme.borderRadius.full};
    background: ${theme.colors.primary[600]};
    cursor: pointer;
    box-shadow: ${theme.shadows.md};
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: ${theme.borderRadius.full};
    background: ${theme.colors.primary[600]};
    cursor: pointer;
    border: none;
    box-shadow: ${theme.shadows.md};
  }
`;

const SliderValue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing[2]};
`;

const ValueDisplay = styled.span`
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.primary[600]};
`;

const ValueLabel = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.tertiary};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[2]};
  margin-top: ${theme.spacing[3]};
`;

const Tag = styled(motion.span)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  background: ${theme.colors.primary[100]};
  color: ${theme.colors.primary[700]};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.primary[200]};
  }
`;

const TagInput = styled.input`
  flex: 1;
  min-width: 120px;
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  border: 1px solid ${theme.colors.border.medium};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  background: ${theme.colors.background.primary};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  margin-top: ${theme.spacing[6]};
`;

const Button = styled(motion.button)<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[3]} ${theme.spacing[6]};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.base};
  transition: all ${theme.transitions.fast};
  border: 2px solid transparent;

  ${({ variant = 'primary' }) =>
    variant === 'primary'
      ? `
        background: ${theme.colors.primary[600]};
        color: ${theme.colors.text.inverse};
        
        &:hover {
          background: ${theme.colors.primary[700]};
          transform: translateY(-1px);
          box-shadow: ${theme.shadows.lg};
        }
      `
      : `
        background: transparent;
        color: ${theme.colors.text.secondary};
        border-color: ${theme.colors.border.medium};
        
        &:hover {
          background: ${theme.colors.background.secondary};
          border-color: ${theme.colors.error[500]};
          color: ${theme.colors.error[600]};
        }
      `}
`;

interface JournalEntryFormProps {
  onSubmit: (entry: {
    content: string;
    mood: MoodType;
    energyLevel: number;
    stressLevel: number;
    tags: string[];
  }) => void;
  onCancel?: () => void;
  initialData?: {
    content?: string;
    mood?: MoodType;
    energyLevel?: number;
    stressLevel?: number;
    tags?: string[];
  } | null;
}

const JournalEntryForm: React.FC<JournalEntryFormProps> = ({
  onSubmit,
  onCancel,
  initialData
}) => {
  const safeInitialData = initialData || {};
  const [content, setContent] = useState(safeInitialData.content || '');
  const [mood, setMood] = useState<MoodType | null>(safeInitialData.mood || null);
  const [energyLevel, setEnergyLevel] = useState(safeInitialData.energyLevel || 5);
  const [stressLevel, setStressLevel] = useState(safeInitialData.stressLevel || 5);
  const [tags, setTags] = useState<string[]>(safeInitialData.tags || []);
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood) return;

    onSubmit({
      content,
      mood,
      energyLevel,
      stressLevel,
      tags
    });
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <JournalEntryContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <form onSubmit={handleSubmit}>
        <Header>
          <HeaderIcon />
          <Title>Новая запись</Title>
        </Header>

        <Section>
          <SectionTitle>
            <BookOpen size={20} />
            Как прошёл твой день?
          </SectionTitle>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Расскажи о том, что произошло сегодня, как ты себя чувствуешь, что тебя порадовало или огорчило..."
            maxLength={2000}
          />
        </Section>

        <Section>
          <SectionTitle>
            <Smile size={20} />
            Настроение
          </SectionTitle>
          <MoodGrid>
            {MOOD_OPTIONS.map((moodOption) => (
              <MoodButton
                key={moodOption.mood}
                selected={mood === moodOption.mood}
                color={moodOption.color}
                onClick={() => setMood(moodOption.mood)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MoodEmoji>{moodOption.mood}</MoodEmoji>
                <MoodLabel>{moodOption.label}</MoodLabel>
              </MoodButton>
            ))}
          </MoodGrid>
        </Section>

        <Section>
          <SectionTitle>
            <Battery size={20} />
            Уровень энергии
          </SectionTitle>
          <SliderContainer>
            <SliderLabel>От 1 (полное истощение) до 10 (полон энергии)</SliderLabel>
            <Slider
              type="range"
              min="1"
              max="10"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
            />
            <SliderValue>
              <ValueDisplay>{energyLevel}</ValueDisplay>
              <ValueLabel>{ENERGY_LEVELS[energyLevel - 1]?.label}</ValueLabel>
            </SliderValue>
          </SliderContainer>
        </Section>

        <Section>
          <SectionTitle>
            <AlertTriangle size={20} />
            Уровень стресса
          </SectionTitle>
          <SliderContainer>
            <SliderLabel>От 1 (полное спокойствие) до 10 (критический стресс)</SliderLabel>
            <Slider
              type="range"
              min="1"
              max="10"
              value={stressLevel}
              onChange={(e) => setStressLevel(Number(e.target.value))}
            />
            <SliderValue>
              <ValueDisplay>{stressLevel}</ValueDisplay>
              <ValueLabel>{STRESS_LEVELS[stressLevel - 1]?.label}</ValueLabel>
            </SliderValue>
          </SliderContainer>
        </Section>

        <Section>
          <SectionTitle>
            <TagIcon size={20} />
            Теги (необязательно)
          </SectionTitle>
          <div style={{ display: 'flex', gap: theme.spacing[2], marginBottom: theme.spacing[3] }}>
            <TagInput
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Добавить тег..."
              maxLength={20}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={addTag}
              disabled={!newTag.trim() || tags.length >= 5}
            >
              Добавить
            </Button>
          </div>
          <TagsContainer>
            {tags.map((tag) => (
              <Tag
                key={tag}
                onClick={() => removeTag(tag)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
                <X size={14} />
              </Tag>
            ))}
          </TagsContainer>
        </Section>

        <ButtonContainer>
          <Button
            type="submit"
            variant="primary"
            disabled={!content.trim() || !mood}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send size={20} />
            Сохранить запись
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Отмена
            </Button>
          )}
        </ButtonContainer>
      </form>
    </JournalEntryContainer>
  );
};

export default JournalEntryForm;
