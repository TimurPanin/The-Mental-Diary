import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heart, Shield, Lock, Mail, User } from 'lucide-react';
import { useJournalStore } from '../hooks/useTimer';
import { theme } from '../styles/theme';
import DisclaimerModal from './DisclaimerModal';

const LoginContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  padding: ${theme.spacing[6]};
  background: linear-gradient(135deg, ${theme.colors.primary[50]} 0%, ${theme.colors.secondary[50]} 100%);
  box-sizing: border-box;
`;

const LoginCard = styled(motion.div)`
  background: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing[8]};
  box-shadow: ${theme.shadows.xl};
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing[6]};
  gap: ${theme.spacing[3]};
`;

const LogoIcon = styled(Heart)`
  width: 48px;
  height: 48px;
  color: ${theme.colors.primary[600]};
`;

const Title = styled.h1`
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing[2]};
`;

const Subtitle = styled.p`
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing[8]};
  font-size: ${theme.fontSizes.lg};
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing[4]};
  margin-bottom: ${theme.spacing[8]};
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[4]};
  background: ${theme.colors.background.secondary};
  border-radius: ${theme.borderRadius.lg};
  transition: transform ${theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
  }
`;

const FeatureIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.primary[100]};
  border-radius: ${theme.borderRadius.full};
  color: ${theme.colors.primary[600]};
`;

const FeatureText = styled.span`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text.secondary};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing[4]};
`;

const Button = styled(motion.button)<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
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
        color: ${theme.colors.text.primary};
        border-color: ${theme.colors.border.medium};
        
        &:hover {
          background: ${theme.colors.background.secondary};
          border-color: ${theme.colors.primary[500]};
          color: ${theme.colors.primary[600]};
        }
      `}
`;

const PrivacyNote = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text.tertiary};
  margin-top: ${theme.spacing[6]};
  line-height: ${theme.lineHeights.relaxed};
`;

const DisclaimerNote = styled.div`
  background: ${theme.colors.warning[50]};
  border: 1px solid ${theme.colors.warning[200]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[4]};
  margin-top: ${theme.spacing[4]};
  text-align: center;
`;

const DisclaimerText = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.warning[700]};
  margin: 0;
  line-height: ${theme.lineHeights.relaxed};
`;

const DisclaimerLink = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.warning[800]};
  text-decoration: underline;
  cursor: pointer;
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  margin-top: ${theme.spacing[2]};

  &:hover {
    color: ${theme.colors.warning[900]};
  }
`;

interface LoginScreenProps {
  onLogin: (email?: string) => void;
  onShowDisclaimer?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onShowDisclaimer }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const handleAnonymousLogin = async () => {
    setIsLoading(true);
    try {
      onLogin();
    } catch (error) {
      console.error('Ошибка входа:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    const email = prompt('Введите ваш email (необязательно):');
    if (email !== null) {
      setIsLoading(true);
      try {
        onLogin(email || undefined);
      } catch (error) {
        console.error('Ошибка входа:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <LoginContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <LoginCard
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Logo>
          <LogoIcon />
          <div>
            <Title>Ментальный дневник</Title>
            <Subtitle>Заботимся о вашем психическом здоровье</Subtitle>
          </div>
        </Logo>

        <Features>
          <Feature>
            <FeatureIcon>
              <Shield size={20} />
            </FeatureIcon>
            <FeatureText>Конфиденциальность</FeatureText>
          </Feature>
          <Feature>
            <FeatureIcon>
              <Lock size={20} />
            </FeatureIcon>
            <FeatureText>Шифрование данных</FeatureText>
          </Feature>
          <Feature>
            <FeatureIcon>
              <Heart size={20} />
            </FeatureIcon>
            <FeatureText>Отслеживание настроения</FeatureText>
          </Feature>
          <Feature>
            <FeatureIcon>
              <User size={20} />
            </FeatureIcon>
            <FeatureText>Анонимность</FeatureText>
          </Feature>
        </Features>

        <ButtonGroup>
          <Button
            variant="primary"
            onClick={handleAnonymousLogin}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <User size={20} />
            Начать анонимно
          </Button>

          <Button
            variant="secondary"
            onClick={handleEmailLogin}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={20} />
            Войти с email
          </Button>
        </ButtonGroup>

        <PrivacyNote>
          Ваши данные хранятся локально на вашем устройстве и зашифрованы. 
          Мы не имеем доступа к вашей личной информации.
        </PrivacyNote>

        <DisclaimerNote>
          <DisclaimerText>
            Данный сервис предназначен исключительно для личного использования и не является медицинской или психотерапевтической помощью. 
            Мы не предоставляем диагностику, лечение или иные медицинские услуги.
          </DisclaimerText>
          <DisclaimerLink onClick={() => setShowDisclaimer(true)}>
            Подробнее об отказе от ответственности
          </DisclaimerLink>
        </DisclaimerNote>
      </LoginCard>
      
      <DisclaimerModal 
        isOpen={showDisclaimer} 
        onClose={() => setShowDisclaimer(false)} 
      />
    </LoginContainer>
  );
};

export default LoginScreen;
