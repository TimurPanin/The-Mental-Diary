import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heart, Database, BarChart3, Mail, User } from 'lucide-react';
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

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
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
    const email = prompt('Введите email для локального профиля (необязательно):');
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
            <Subtitle>Прототип дневника настроения и самонаблюдения</Subtitle>
          </div>
        </Logo>

        <Features>
          <Feature>
            <FeatureIcon>
              <Database size={20} />
            </FeatureIcon>
            <FeatureText>Локальное хранение</FeatureText>
          </Feature>
          <Feature>
            <FeatureIcon>
              <BarChart3 size={20} />
            </FeatureIcon>
            <FeatureText>Графики и аналитика</FeatureText>
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
            <FeatureText>Локальный профиль</FeatureText>
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
            Начать локально
          </Button>

          <Button
            variant="secondary"
            onClick={handleEmailLogin}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail size={20} />
            Указать email локально
          </Button>
        </ButtonGroup>

        <PrivacyNote>
          Данные приложения сохраняются в localStorage этого браузера. Это демонстрационный проект: не используйте его для хранения чувствительной или медицинской информации. Серверной синхронизации нет.
        </PrivacyNote>

        <DisclaimerNote>
          <DisclaimerText>
            Проект предназначен для демонстрации интерфейса и логики дневника. Он не выполняет медицинскую диагностику и не заменяет профессиональную помощь.
          </DisclaimerText>
          <DisclaimerLink onClick={() => setShowDisclaimer(true)}>
            Подробнее об ограничениях проекта
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
