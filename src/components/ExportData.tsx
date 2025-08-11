import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Download, 
  Upload, 
  FileText, 
  FileJson, 
  FileCode,
  Calendar,
  CheckSquare,
  Square,
  Trash2,
  Save,
  RefreshCw,
  AlertTriangle,
  Info
} from 'lucide-react';
import { ExportOptions, BackupData } from '../types';
import { theme } from '../styles/theme';

const ExportContainer = styled.div`
  padding: ${theme.spacing[6]};
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  margin-bottom: ${theme.spacing[6]};
`;

const HeaderIcon = styled(Download)`
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

const Section = styled.div`
  background: ${theme.colors.background.primary};
  border: 1px solid ${theme.colors.border.medium};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing[6]};
  margin-bottom: ${theme.spacing[6]};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing[4]} 0;
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`;

const FormatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[6]};
`;

const FormatCard = styled(motion.div)<{ selected: boolean }>`
  border: 2px solid ${props => props.selected ? theme.colors.primary[500] : theme.colors.border.medium};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[4]};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  background: ${props => props.selected ? theme.colors.primary[50] : theme.colors.background.secondary};

  &:hover {
    border-color: ${theme.colors.primary[400]};
    transform: translateY(-2px);
  }
`;

const FormatIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.primary[100]};
  color: ${theme.colors.primary[600]};
  margin-bottom: ${theme.spacing[3]};
`;

const FormatTitle = styled.h3`
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text.primary};
  margin: 0 0 ${theme.spacing[1]} 0;
`;

const FormatDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin: 0;
  line-height: 1.4;
`;

const DateRangeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[6]};
`;

const DateInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[2]};
`;

const DateLabel = styled.label`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.primary};
`;

const DateInputField = styled.input`
  padding: ${theme.spacing[3]};
  border: 1px solid ${theme.colors.border.medium};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSizes.base};
  background: ${theme.colors.background.primary};
  color: ${theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[6]};
`;

const OptionItem = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  padding: ${theme.spacing[3]};
  border: 1px solid ${theme.colors.border.medium};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.primary[400]};
    background: ${theme.colors.primary[50]};
  }
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: ${theme.colors.primary[600]};
`;

const OptionText = styled.div`
  flex: 1;
`;

const OptionTitle = styled.div`
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[1]};
`;

const OptionDescription = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing[4]};
  justify-content: center;
`;

const ActionButton = styled(motion.button)<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[3]} ${theme.spacing[6]};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.base};
  transition: all ${theme.transitions.fast};
  border: 2px solid transparent;
  cursor: pointer;

  ${({ variant = 'secondary' }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary[600]};
          color: ${theme.colors.text.inverse};
          
          &:hover {
            background: ${theme.colors.primary[700]};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.lg};
          }
        `;
      case 'danger':
        return `
          background: ${theme.colors.error[600]};
          color: ${theme.colors.text.inverse};
          
          &:hover {
            background: ${theme.colors.error[700]};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.lg};
          }
        `;
      default:
        return `
          background: transparent;
          color: ${theme.colors.text.secondary};
          border-color: ${theme.colors.border.medium};
          
          &:hover {
            background: ${theme.colors.background.secondary};
            border-color: ${theme.colors.primary[400]};
            color: ${theme.colors.primary[600]};
          }
        `;
    }
  }}
`;

const InfoBox = styled.div`
  background: ${theme.colors.info[50]};
  border: 1px solid ${theme.colors.info[200]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[6]};
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing[3]};
`;

const InfoIcon = styled(Info)`
  color: ${theme.colors.info[600]};
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px;
`;

const InfoContent = styled.div`
  color: ${theme.colors.info[800]};
  font-size: ${theme.fontSizes.sm};
  line-height: 1.5;
`;

const WarningBox = styled.div`
  background: ${theme.colors.warning[50]};
  border: 1px solid ${theme.colors.warning[200]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[6]};
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing[3]};
`;

const WarningIcon = styled(AlertTriangle)`
  color: ${theme.colors.warning[600]};
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-top: 2px;
`;

const WarningContent = styled.div`
  color: ${theme.colors.warning[800]};
  font-size: ${theme.fontSizes.sm};
  line-height: 1.5;
`;

const FileUpload = styled.div`
  border: 2px dashed ${theme.colors.border.medium};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[8]};
  text-align: center;
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.primary[400]};
    background: ${theme.colors.primary[50]};
  }
`;

const UploadIcon = styled(Upload)`
  width: 48px;
  height: 48px;
  color: ${theme.colors.neutral[400]};
  margin: 0 auto ${theme.spacing[3]} auto;
`;

const UploadText = styled.div`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSizes.base};
`;

interface ExportDataProps {
  onExport: (options: ExportOptions) => string;
  onCreateBackup: () => BackupData;
  onRestoreFromBackup: (backup: BackupData) => void;
  onClearAllData: () => void;
}

const ExportData: React.FC<ExportDataProps> = ({
  onExport,
  onCreateBackup,
  onRestoreFromBackup,
  onClearAllData
}) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'json',
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 дней назад
      end: new Date()
    },
    includeAnalytics: true,
    includeAI: true,
    includeExercises: true
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const formatOptions = [
    {
      value: 'json' as const,
      title: 'JSON',
      description: 'Структурированный формат для программного использования',
      icon: <FileJson size={24} />
    },
    {
      value: 'markdown' as const,
      title: 'Markdown',
      description: 'Читаемый формат для документооборота',
      icon: <FileCode size={24} />
    },
    {
      value: 'pdf' as const,
      title: 'PDF',
      description: 'Печатный формат для архивирования',
      icon: <FileText size={24} />
    }
  ];

  const handleFormatSelect = (format: ExportOptions['format']) => {
    setExportOptions(prev => ({ ...prev, format }));
  };

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    setExportOptions(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: new Date(value)
      }
    }));
  };

  const handleOptionToggle = (option: keyof Pick<ExportOptions, 'includeAnalytics' | 'includeAI' | 'includeExercises'>) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  const handleExport = () => {
    const exportedData = onExport(exportOptions);
    
    // Создаем файл для скачивания
    const blob = new Blob([exportedData], { 
      type: exportOptions.format === 'json' ? 'application/json' : 
            exportOptions.format === 'markdown' ? 'text/markdown' : 'text/html'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mental-health-journal-${new Date().toISOString().split('T')[0]}.${
      exportOptions.format === 'json' ? 'json' : 
      exportOptions.format === 'markdown' ? 'md' : 'html'
    }`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCreateBackup = () => {
    const backup = onCreateBackup();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mental-health-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRestore = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backupData = JSON.parse(e.target?.result as string);
        onRestoreFromBackup(backupData);
        setSelectedFile(null);
        // Сброс input
        const input = document.getElementById('backup-file') as HTMLInputElement;
        if (input) input.value = '';
      } catch (error) {
        alert('Ошибка при чтении файла резервной копии');
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleClearData = () => {
    if (window.confirm('Вы уверены, что хотите удалить все данные? Это действие нельзя отменить.')) {
      onClearAllData();
    }
  };

  return (
    <ExportContainer>
      <Header>
        <HeaderIcon />
        <div>
          <Title>Экспорт и резервное копирование</Title>
          <Subtitle>Управляйте своими данными и создавайте резервные копии</Subtitle>
        </div>
      </Header>

      <Section>
        <SectionTitle>
          <Download size={24} />
          Экспорт данных
        </SectionTitle>

        <InfoBox>
          <InfoIcon />
          <InfoContent>
            Экспорт позволяет сохранить ваши записи в различных форматах для дальнейшего использования или архивирования.
          </InfoContent>
        </InfoBox>

        <div style={{ marginBottom: theme.spacing[6] }}>
          <h3 style={{ marginBottom: theme.spacing[3], color: theme.colors.text.primary }}>
            Формат экспорта:
          </h3>
          <FormatGrid>
            {formatOptions.map((format) => (
              <FormatCard
                key={format.value}
                selected={exportOptions.format === format.value}
                onClick={() => handleFormatSelect(format.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FormatIcon>
                  {format.icon}
                </FormatIcon>
                <FormatTitle>{format.title}</FormatTitle>
                <FormatDescription>{format.description}</FormatDescription>
              </FormatCard>
            ))}
          </FormatGrid>
        </div>

        <div style={{ marginBottom: theme.spacing[6] }}>
          <h3 style={{ marginBottom: theme.spacing[3], color: theme.colors.text.primary }}>
            Период данных:
          </h3>
          <DateRangeContainer>
            <DateInput>
              <DateLabel>С даты:</DateLabel>
              <DateInputField
                type="date"
                value={exportOptions.dateRange.start.toISOString().split('T')[0]}
                onChange={(e) => handleDateChange('start', e.target.value)}
              />
            </DateInput>
            <DateInput>
              <DateLabel>По дату:</DateLabel>
              <DateInputField
                type="date"
                value={exportOptions.dateRange.end.toISOString().split('T')[0]}
                onChange={(e) => handleDateChange('end', e.target.value)}
              />
            </DateInput>
          </DateRangeContainer>
        </div>

        <div style={{ marginBottom: theme.spacing[6] }}>
          <h3 style={{ marginBottom: theme.spacing[3], color: theme.colors.text.primary }}>
            Включить в экспорт:
          </h3>
          <OptionsGrid>
            <OptionItem>
              <Checkbox
                type="checkbox"
                checked={exportOptions.includeAnalytics}
                onChange={() => handleOptionToggle('includeAnalytics')}
              />
              <OptionText>
                <OptionTitle>Аналитика</OptionTitle>
                <OptionDescription>Графики и статистика</OptionDescription>
              </OptionText>
            </OptionItem>
            <OptionItem>
              <Checkbox
                type="checkbox"
                checked={exportOptions.includeAI}
                onChange={() => handleOptionToggle('includeAI')}
              />
              <OptionText>
                <OptionTitle>AI анализ</OptionTitle>
                <OptionDescription>Анализ эмоций и рекомендации</OptionDescription>
              </OptionText>
            </OptionItem>
            <OptionItem>
              <Checkbox
                type="checkbox"
                checked={exportOptions.includeExercises}
                onChange={() => handleOptionToggle('includeExercises')}
              />
              <OptionText>
                <OptionTitle>Упражнения</OptionTitle>
                <OptionDescription>Микро-упражнения и задачи</OptionDescription>
              </OptionText>
            </OptionItem>
          </OptionsGrid>
        </div>

        <ActionButtons>
          <ActionButton variant="primary" onClick={handleExport}>
            <Download size={16} />
            Экспортировать
          </ActionButton>
        </ActionButtons>
      </Section>

      <Section>
        <SectionTitle>
          <Save size={24} />
          Резервное копирование
        </SectionTitle>

        <InfoBox>
          <InfoIcon />
          <InfoContent>
            Резервная копия содержит все ваши данные в полном объеме и может быть использована для восстановления.
          </InfoContent>
        </InfoBox>

        <ActionButtons>
          <ActionButton variant="primary" onClick={handleCreateBackup}>
            <Save size={16} />
            Создать резервную копию
          </ActionButton>
        </ActionButtons>
      </Section>

      <Section>
        <SectionTitle>
          <Upload size={24} />
          Восстановление из резервной копии
        </SectionTitle>

        <WarningBox>
          <WarningIcon />
          <WarningContent>
            Внимание! Восстановление из резервной копии заменит все текущие данные. Убедитесь, что вы сохранили важную информацию.
          </WarningContent>
        </WarningBox>

        <FileUpload>
          <input
            id="backup-file"
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <label htmlFor="backup-file" style={{ cursor: 'pointer' }}>
            <UploadIcon />
            <UploadText>
              {selectedFile ? `Выбран файл: ${selectedFile.name}` : 'Нажмите для выбора файла резервной копии'}
            </UploadText>
          </label>
        </FileUpload>

        <ActionButtons>
          <ActionButton 
            variant="secondary" 
            onClick={handleRestore}
            disabled={!selectedFile}
          >
            <RefreshCw size={16} />
            Восстановить
          </ActionButton>
        </ActionButtons>
      </Section>

      <Section>
        <SectionTitle>
          <Trash2 size={24} />
          Очистка данных
        </SectionTitle>

        <WarningBox>
          <WarningIcon />
          <WarningContent>
            Удаление всех данных необратимо. Все записи, аналитика и настройки будут безвозвратно удалены.
          </WarningContent>
        </WarningBox>

        <ActionButtons>
          <ActionButton variant="danger" onClick={handleClearData}>
            <Trash2 size={16} />
            Удалить все данные
          </ActionButton>
        </ActionButtons>
      </Section>
    </ExportContainer>
  );
};

export default ExportData;

