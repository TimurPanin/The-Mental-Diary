import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Edit, 
  Trash2, 
  Tag as TagIcon,
  Battery,
  AlertTriangle
} from 'lucide-react';
import { formatDate, formatTime } from '../utils/timerUtils';
import { theme } from '../styles/theme';
import { JournalEntry } from '../types';

const EntryCard = styled(motion.div)`
  background: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing[6]};
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${theme.colors.border.light};
  margin-bottom: ${theme.spacing[4]};
  transition: all ${theme.transitions.fast};

  &:hover {
    box-shadow: ${theme.shadows.lg};
    transform: translateY(-2px);
  }
`;

const EntryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing[4]};
`;

const EntryMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  color: ${theme.colors.text.tertiary};
  font-size: ${theme.fontSizes.sm};
`;

const EntryDate = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  font-weight: ${theme.fontWeights.medium};
`;

const EntryTime = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing[2]};
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.background.secondary};
  color: ${theme.colors.text.secondary};
  border: 1px solid ${theme.colors.border.light};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.primary[50]};
    color: ${theme.colors.primary[600]};
    border-color: ${theme.colors.primary[200]};
  }

  &.delete:hover {
    background: ${theme.colors.error[50]};
    color: ${theme.colors.error[600]};
    border-color: ${theme.colors.error[200]};
  }
`;

const EntryContent = styled.div`
  margin-bottom: ${theme.spacing[4]};
  line-height: ${theme.lineHeights.relaxed};
  color: ${theme.colors.text.primary};
  white-space: pre-wrap;
`;

const EntryMood = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[4]};
`;

const MoodEmoji = styled.span`
  font-size: ${theme.fontSizes['2xl']};
`;

const MoodLabel = styled.span`
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.secondary};
`;

const MetricsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[4]};
`;

const Metric = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[3]};
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.lg};
`;

const MetricIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.primary[100]};
  color: ${theme.colors.primary[600]};
`;

const MetricInfo = styled.div`
  flex: 1;
`;

const MetricLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.tertiary};
  margin-bottom: ${theme.spacing[1]};
`;

const MetricValue = styled.div`
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text.primary};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[2]};
`;

const Tag = styled.span`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[1]};
  padding: ${theme.spacing[1]} ${theme.spacing[3]};
  background: ${theme.colors.primary[100]};
  color: ${theme.colors.primary[700]};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing[12]};
  color: ${theme.colors.text.tertiary};
`;

const EmptyIcon = styled(Calendar)`
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

interface JournalEntryListProps {
  entries: JournalEntry[];
  onEdit?: (entry: JournalEntry) => void;
  onDelete?: (id: string) => void;
}

const JournalEntryList: React.FC<JournalEntryListProps> = ({
  entries,
  onEdit,
  onDelete
}) => {
  if (entries.length === 0) {
    return (
      <EmptyState>
        <EmptyIcon />
        <EmptyTitle>Записей пока нет</EmptyTitle>
        <EmptyText>
          Начните вести дневник, чтобы отслеживать своё настроение и эмоции
        </EmptyText>
      </EmptyState>
    );
  }

  return (
    <div>
      {entries.map((entry) => (
        <EntryCard
          key={entry.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          layout
        >
          <EntryHeader>
            <EntryMeta>
              <EntryDate>
                <Calendar size={16} />
                {formatDate(entry.date)}
              </EntryDate>
              <EntryTime>
                <Clock size={16} />
                {formatTime(entry.createdAt)}
              </EntryTime>
            </EntryMeta>
            
            <ActionButtons>
              {onEdit && (
                <ActionButton
                  onClick={() => onEdit(entry)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Редактировать"
                >
                  <Edit size={16} />
                </ActionButton>
              )}
              {onDelete && (
                <ActionButton
                  className="delete"
                  onClick={() => onDelete(entry.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Удалить"
                >
                  <Trash2 size={16} />
                </ActionButton>
              )}
            </ActionButtons>
          </EntryHeader>

          <EntryContent>{entry.content}</EntryContent>

          <EntryMood>
            <MoodEmoji>{entry.mood}</MoodEmoji>
            <MoodLabel>
              {['😊', '😄', '😌', '😐', '😔', '😢', '😡', '😰', '😴', '🤗'].indexOf(entry.mood) >= 0
                ? ['Счастливый', 'Радостный', 'Спокойный', 'Нейтральный', 'Грустный', 'Печальный', 'Раздражённый', 'Тревожный', 'Уставший', 'Благодарный'][['😊', '😄', '😌', '😐', '😔', '😢', '😡', '😰', '😴', '🤗'].indexOf(entry.mood)]
                : 'Настроение'}
            </MoodLabel>
          </EntryMood>

          <MetricsContainer>
            <Metric>
              <MetricIcon>
                <Battery size={16} />
              </MetricIcon>
              <MetricInfo>
                <MetricLabel>Энергия</MetricLabel>
                <MetricValue>{entry.energyLevel}/10</MetricValue>
              </MetricInfo>
            </Metric>
            
            <Metric>
              <MetricIcon>
                <AlertTriangle size={16} />
              </MetricIcon>
              <MetricInfo>
                <MetricLabel>Стресс</MetricLabel>
                <MetricValue>{entry.stressLevel}/10</MetricValue>
              </MetricInfo>
            </Metric>
          </MetricsContainer>

          {entry.tags.length > 0 && (
            <TagsContainer>
              {entry.tags.map((tag) => (
                <Tag key={tag}>
                  <TagIcon size={12} />
                  {tag}
                </Tag>
              ))}
            </TagsContainer>
          )}
        </EntryCard>
      ))}
    </div>
  );
};

export default JournalEntryList;
