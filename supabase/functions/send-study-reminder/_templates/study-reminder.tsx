
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface StudyReminderEmailProps {
  username: string;
  sessionTitle: string;
  subject: string;
  level: string;
}

export const StudyReminderEmail = ({
  username,
  sessionTitle,
  subject,
  level,
}: StudyReminderEmailProps) => (
  <Html>
    <Head />
    <Preview>📚 Il est temps de commencer votre session d'étude !</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Rappel d'étude</Heading>
        <Text style={text}>
          Bonjour {username},
        </Text>
        <Text style={text}>
          Il est temps de commencer votre session d'étude : <strong>{sessionTitle}</strong>
        </Text>
        <Text style={text}>
          Matière : {subject}<br />
          Niveau : {level}
        </Text>
        <Text style={text}>
          Bon apprentissage avec Génie Facile !
        </Text>
        <Text style={footer}>
          L'équipe Génie Facile
        </Text>
      </Container>
    </Body>
  </Html>
)

export default StudyReminderEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const h1 = {
  color: '#9b87f5',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
}

const footer = {
  color: '#898989',
  fontSize: '14px',
  lineHeight: '24px',
  marginTop: '32px',
  marginBottom: '0',
}
