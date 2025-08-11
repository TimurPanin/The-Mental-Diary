import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  BarChart3, 
  Settings, 
  Plus, 
  X, 
  Heart,
  Calendar,
  Activity,
  Download,
  LogOut,
  User,
  AlertTriangle
} from 'lucide-react';
import { useJournalStore } from './hooks/useTimer';
import { JournalEntry, MoodType } from './types';
import { theme } from './styles/theme';
import LoginScreen from './components/LoginScreen';
import JournalEntryList from './components/JournalEntryList';
import Analytics from './components/Analytics';
import JournalEntryForm from './components/JournalEntryForm';
import MonthlyThemes from './components/MonthlyThemes';
import MicroExercises from './components/MicroExercises';
import ExportData from './components/ExportData';
import DisclaimerModal from './components/DisclaimerModal';
import toast, { Toaster } from 'react-hot-toast';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.primary};
  color: ${theme.colors.text.primary};
`;

const Header = styled.header`
  background: ${theme.colors.background.secondary};
  border-bottom: 1px solid ${theme.colors.border.light};
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.header};
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.primary[600]};
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`;

const NavButton = styled(motion.button)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.fontWeights.medium};
  font-size: ${theme.fontSizes.sm};
  transition: all ${theme.transitions.fast};
  border: 1px solid transparent;
  background: ${props => props.active ? theme.colors.primary[100] : 'transparent'};
  color: ${props => props.active ? theme.colors.primary[700] : theme.colors.text.secondary};
  cursor: pointer;

  &:hover {
    background: ${props => props.active ? theme.colors.primary[200] : theme.colors.background.primary};
    color: ${props => props.active ? theme.colors.primary[800] : theme.colors.text.primary};
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.fontWeights.medium};
  font-size: ${theme.fontSizes.sm};
  transition: all ${theme.transitions.fast};
  border: 1px solid ${theme.colors.border.medium};
  background: transparent;
  color: ${theme.colors.text.secondary};
  cursor: pointer;

  &:hover {
    background: ${theme.colors.background.primary};
    border-color: ${theme.colors.primary[400]};
    color: ${theme.colors.primary[600]};
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing[6]};
`;

const FloatingActionButton = styled(motion.button)`
  position: fixed;
  bottom: ${theme.spacing[6]};
  right: ${theme.spacing[6]};
  width: 60px;
  height: 60px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.primary[600]};
  color: ${theme.colors.text.inverse};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${theme.shadows.lg};
  z-index: ${theme.zIndex.floating};

  &:hover {
    background: ${theme.colors.primary[700]};
    transform: scale(1.1);
  }
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.modal};
  padding: ${theme.spacing[4]};
`;

const ModalContent = styled(motion.div)`
  background: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.xl};
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing[4]};
  right: ${theme.spacing[4]};
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.medium};
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.modal + 1};

  &:hover {
    background: ${theme.colors.error[50]};
    border-color: ${theme.colors.error[400]};
    color: ${theme.colors.error[600]};
  }
`;

const SuggestionCard = styled(motion.div)`
  background: ${theme.colors.primary[50]};
  border: 1px solid ${theme.colors.primary[200]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[4]};
  position: relative;
`;

const SuggestionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[2]};
`;

const SuggestionIcon = styled(Heart)`
  color: ${theme.colors.primary[600]};
  width: 20px;
  height: 20px;
`;

const SuggestionTitle = styled.h4`
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.primary[700]};
  margin: 0;
`;

const SuggestionContent = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.secondary};
  margin: 0;
  line-height: 1.5;
`;

const SuggestionDismiss = styled.button`
  position: absolute;
  top: ${theme.spacing[3]};
  right: ${theme.spacing[3]};
  width: 24px;
  height: 24px;
  border-radius: ${theme.borderRadius.full};
  background: transparent;
  border: none;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.colors.background.secondary};
    color: ${theme.colors.error[600]};
  }
`;

const App: React.FC = () => {
  const {
    user,
    entries,
    analytics,
    suggestions,
    monthlyThemes,
    currentTheme,
    exercises,
    moodBoosters,
    login,
    logout,
    addEntry,
    updateEntry,
    deleteEntry,
    generateSuggestion,
    dismissSuggestion,
    selectTheme,
    completeThemeTask,
    resetTheme,
    addExercise,
    completeExercise,
    removeExercise,
    addMoodBooster,
    completeMoodBooster,
    removeMoodBooster,
    exportData,
    createBackup,
    restoreFromBackup,
    clearAllData
  } = useJournalStore();

  const [currentView, setCurrentView] = useState<'journal' | 'analytics' | 'themes' | 'exercises' | 'export'>('journal');
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const handleAddEntry = (entryData: {
    content: string;
    mood: MoodType;
    energyLevel: number;
    stressLevel: number;
    tags: string[];
  }) => {
    // Проверяем валидацию на клиенте
    if (!entryData.content.trim()) {
      toast.error('Введите текст записи');
      return;
    }
    
    if (!entryData.mood) {
      toast.error('Выберите настроение');
      return;
    }

    try {
      addEntry({
        ...entryData,
        date: new Date()
      });
      
      // Закрываем форму только после успешного добавления
      setShowEntryForm(false);
      setEditingEntry(null);
      toast.success('Запись добавлена');
    } catch (error) {
      console.error('Ошибка при добавлении записи:', error);
      toast.error('Ошибка при добавлении записи');
    }
  };

  const handleUpdateEntry = (entryData: {
    content: string;
    mood: MoodType;
    energyLevel: number;
    stressLevel: number;
    tags: string[];
  }) => {
    if (editingEntry) {
      updateEntry(editingEntry.id, {
        ...entryData,
        date: editingEntry.date // Сохраняем оригинальную дату
      });
      setShowEntryForm(false);
      setEditingEntry(null);
      toast.success('Запись обновлена');
    }
  };

  const handleDeleteEntry = (id: string) => {
    deleteEntry(id);
    toast.success('Запись удалена');
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setShowEntryForm(true);
  };

  const handleLogout = () => {
    logout();
    toast.success('Вы вышли из системы');
  };

  const getNavIcon = (view: string) => {
    switch (view) {
      case 'journal': return <BookOpen size={16} />;
      case 'analytics': return <BarChart3 size={16} />;
      case 'themes': return <Calendar size={16} />;
      case 'exercises': return <Activity size={16} />;
      case 'export': return <Download size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  const getNavLabel = (view: string) => {
    switch (view) {
      case 'journal': return 'Дневник';
      case 'analytics': return 'Аналитика';
      case 'themes': return 'Темы';
      case 'exercises': return 'Упражнения';
      case 'export': return 'Экспорт';
      default: return 'Дневник';
    }
  };

  if (!user) {
    return <LoginScreen onLogin={login} onShowDisclaimer={() => setShowDisclaimer(true)} />;
  }

  return (
    <AppContainer>
      <Toaster position="top-right" />
      
      <Header>
        <HeaderContent>
          <Logo>
            <Heart size={24} />
            Ментальный дневник
          </Logo>
          
          <Navigation>
            {(['journal', 'analytics', 'themes', 'exercises', 'export'] as const).map((view) => (
              <NavButton
                key={view}
                active={currentView === view}
                onClick={() => setCurrentView(view)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getNavIcon(view)}
                {getNavLabel(view)}
              </NavButton>
            ))}
          </Navigation>

          <UserActions>
            <ActionButton 
              onClick={() => setShowDisclaimer(true)}
              style={{ color: theme.colors.warning[600] }}
            >
              <AlertTriangle size={16} />
              Ответственность
            </ActionButton>
            <ActionButton onClick={handleLogout}>
              <LogOut size={16} />
              Выйти
            </ActionButton>
          </UserActions>
        </HeaderContent>
      </Header>

      <MainContent>
        <AnimatePresence mode="wait">
          {suggestions.length > 0 && currentView === 'journal' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {suggestions.slice(0, 2).map((suggestion) => (
                <SuggestionCard key={suggestion.id}>
                  <SuggestionHeader>
                    <SuggestionIcon />
                    <SuggestionTitle>
                      {suggestion.type === 'support' ? 'Поддержка' :
                       suggestion.type === 'question' ? 'Вопрос для размышления' :
                       suggestion.type === 'insight' ? 'Инсайт' : 'Совет'}
                    </SuggestionTitle>
                  </SuggestionHeader>
                  <SuggestionContent>{suggestion.content}</SuggestionContent>
                  <SuggestionDismiss onClick={() => dismissSuggestion(suggestion.id)}>
                    <X size={16} />
                  </SuggestionDismiss>
                </SuggestionCard>
              ))}
            </motion.div>
          )}

          {currentView === 'journal' && (
            <motion.div
              key="journal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <JournalEntryList
                entries={entries}
                onEdit={handleEditEntry}
                onDelete={handleDeleteEntry}
              />
            </motion.div>
          )}

          {currentView === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Analytics analytics={analytics} />
            </motion.div>
          )}

          {currentView === 'themes' && (
            <motion.div
              key="themes"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MonthlyThemes
                currentTheme={currentTheme}
                onSelectTheme={selectTheme}
                onCompleteTask={completeThemeTask}
                onResetTheme={resetTheme}
              />
            </motion.div>
          )}

          {currentView === 'exercises' && (
            <motion.div
              key="exercises"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MicroExercises
                exercises={exercises}
                onAddExercise={addExercise}
                onCompleteExercise={completeExercise}
                onRemoveExercise={removeExercise}
              />
            </motion.div>
          )}

          {currentView === 'export' && (
            <motion.div
              key="export"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ExportData
                onExport={exportData}
                onCreateBackup={createBackup}
                onRestoreFromBackup={restoreFromBackup}
                onClearAllData={clearAllData}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </MainContent>

      {currentView === 'journal' && (
        <FloatingActionButton
          onClick={() => setShowEntryForm(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus size={24} />
        </FloatingActionButton>
      )}

      <AnimatePresence>
        {showEntryForm && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <ModalCloseButton onClick={() => {
                setShowEntryForm(false);
                setEditingEntry(null);
              }}>
                <X size={20} />
              </ModalCloseButton>
              
              <JournalEntryForm
                onSubmit={editingEntry ? handleUpdateEntry : handleAddEntry}
                onCancel={() => {
                  setShowEntryForm(false);
                  setEditingEntry(null);
                }}
                initialData={editingEntry}
              />
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>

      <DisclaimerModal 
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
      />
    </AppContainer>
  );
};

export default App;
