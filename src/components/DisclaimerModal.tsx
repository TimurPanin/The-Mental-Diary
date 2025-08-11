import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Heart, Phone, UserCheck } from 'lucide-react';
import { theme } from '../styles/theme';

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
  z-index: 9999;
  padding: ${theme.spacing[4]};
`;

const ModalContent = styled(motion.div)`
  background: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing[8]};
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: ${theme.shadows.xl};
  z-index: 10000;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: ${theme.spacing[4]};
  right: ${theme.spacing[4]};
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border.medium};
  border-radius: ${theme.borderRadius.full};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.background.primary};
    border-color: ${theme.colors.border.dark};
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  margin-bottom: ${theme.spacing[6]};
  padding-right: ${theme.spacing[12]};
`;

const HeaderIcon = styled(AlertTriangle)`
  width: 32px;
  height: 32px;
  color: ${theme.colors.warning[600]};
`;

const Title = styled.h2`
  color: ${theme.colors.text.primary};
  margin: 0;
  font-size: ${theme.fontSizes['2xl']};
`;

const Section = styled.div`
  margin-bottom: ${theme.spacing[6]};
`;

const SectionTitle = styled.h3`
  color: ${theme.colors.text.primary};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  margin-bottom: ${theme.spacing[3]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`;

const SectionContent = styled.div`
  color: ${theme.colors.text.secondary};
  line-height: ${theme.lineHeights.relaxed};
  margin-bottom: ${theme.spacing[4]};
`;

const EmergencySection = styled.div`
  background: ${theme.colors.error[50]};
  border: 1px solid ${theme.colors.error[200]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing[4]};
  margin: ${theme.spacing[4]} 0;
`;

const EmergencyTitle = styled.h4`
  color: ${theme.colors.error[700]};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semibold};
  margin-bottom: ${theme.spacing[2]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing[2]};
`;

const EmergencyText = styled.p`
  color: ${theme.colors.error[600]};
  font-size: ${theme.fontSizes.sm};
  margin: 0;
`;

const Footer = styled.div`
  margin-top: ${theme.spacing[6]};
  padding-top: ${theme.spacing[4]};
  border-top: 1px solid ${theme.colors.border.light};
  text-align: center;
  color: ${theme.colors.text.tertiary};
  font-size: ${theme.fontSizes.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing[2]};
`;

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </CloseButton>

            <Header>
              <HeaderIcon />
              <Title>Отказ от ответственности (Disclaimer)</Title>
            </Header>

            <Section>
              <SectionTitle>
                <AlertTriangle size={20} />
                1. Нет медицинской помощи
              </SectionTitle>
              <SectionContent>
                Этот сервис предназначен только для общего самонаблюдения и ведения личных записей. 
                Он не предоставляет медицинской, психотерапевтической, психиатрической или иной 
                профессиональной помощи в области психического здоровья.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>
                <UserCheck size={20} />
                2. Нет диагностики или лечения
              </SectionTitle>
              <SectionContent>
                Информация, отображаемая в приложении, не является диагнозом, медицинским заключением 
                или планом лечения и не должна использоваться для постановки медицинских диагнозов 
                или назначения терапии.
              </SectionContent>
            </Section>

            <Section>
              <SectionTitle>
                <Phone size={20} />
                3. При проблемах с психическим здоровьем
              </SectionTitle>
              <SectionContent>
                Если вы испытываете кризис, чувство безысходности или иные симптомы, негативно 
                влияющие на жизнь, немедленно обратитесь к квалифицированному специалисту: 
                психологу, психотерапевту, психиатру или врачу.
              </SectionContent>
              
              <EmergencySection>
                <EmergencyTitle>
                  <AlertTriangle size={16} />
                  В экстренной ситуации
                </EmergencyTitle>
                <EmergencyText>
                  Свяжитесь с местной службой экстренной помощи (в ЕС — 112, в США — 911), 
                  или горячей линией психологической поддержки (например, 988 в США).
                </EmergencyText>
              </EmergencySection>
            </Section>

            <Section>
              <SectionTitle>
                <UserCheck size={20} />
                4. Ответственность пользователя
              </SectionTitle>
              <SectionContent>
                Вы несёте полную ответственность за любые решения, принятые на основе информации, 
                полученной в приложении. Используя сервис, вы подтверждаете, что понимаете 
                и принимаете данный отказ от ответственности.
              </SectionContent>
            </Section>

            <Footer>
              <Heart size={16} />
              С любовью и заботой о вашем благополучии
            </Footer>
          </ModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default DisclaimerModal;
