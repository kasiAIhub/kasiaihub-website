import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface DiagnosticReportEmailProps {
  name?: string
  reportUrl?: string
  stageLabel?: string
}

const DiagnosticReportEmail = ({
  name,
  reportUrl = 'https://kasiaihub.com/diagnostic',
  stageLabel,
}: DiagnosticReportEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your kasiAIhub Business Check report is ready</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>kasiAIhub · Intelligent Business Systems</Text>
        <Heading style={h1}>Your Business Check report</Heading>
        <Text style={text}>
          {name ? `Hi ${name},` : 'Hi there,'} thanks for completing the Business Check.
          Your report is saved and you can open it any time with the link below.
        </Text>
        {stageLabel ? (
          <Text style={badge}>Where you are right now: {stageLabel}</Text>
        ) : null}
        <Button style={button} href={reportUrl}>
          Open my report
        </Button>
        <Text style={text}>
          Keep this email — it&apos;s your permanent link back to the report.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Questions? Just reply to this email.{' '}
          <Link href="https://kasiaihub.com/entrepreneur-ai-journey" style={link}>
            See the Entrepreneur AI Journey
          </Link>
          .
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: DiagnosticReportEmail,
  subject: 'Your kasiAIhub Business Check report',
  displayName: 'Business Check report',
  previewData: {
    name: 'Thabo',
    reportUrl: 'https://kasiaihub.com/diagnostic/results/example-token',
    stageLabel: 'Stabilisation',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
}
const container = { padding: '24px 25px', maxWidth: '560px' }
const eyebrow = {
  fontSize: '11px',
  letterSpacing: '1px',
  textTransform: 'uppercase' as const,
  color: '#00A87C',
  margin: '0 0 14px',
}
const h1 = {
  fontSize: '24px',
  fontWeight: 'bold' as const,
  color: '#0B0B0B',
  margin: '0 0 18px',
}
const text = {
  fontSize: '15px',
  color: '#44474d',
  lineHeight: '1.6',
  margin: '0 0 20px',
}
const badge = {
  fontSize: '14px',
  fontWeight: 'bold' as const,
  color: '#0B0B0B',
  backgroundColor: '#F1FBF7',
  borderLeft: '3px solid #00C896',
  padding: '10px 14px',
  margin: '0 0 24px',
}
const button = {
  backgroundColor: '#00C896',
  color: '#03110A',
  fontSize: '15px',
  fontWeight: 'bold' as const,
  borderRadius: '10px',
  padding: '13px 22px',
  textDecoration: 'none',
}
const hr = { borderColor: '#e6e6e6', margin: '28px 0 16px' }
const footer = { fontSize: '12px', color: '#999999', margin: '0' }
const link = { color: '#00A87C', textDecoration: 'underline' }

export default DiagnosticReportEmail
