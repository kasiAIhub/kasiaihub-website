import React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  stallName?: string
  whatsapp?: string
  area?: string
  headache?: string
}

const Email = ({ name, stallName, whatsapp, area, headache }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New Kasi Move waitlist signup</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Kasi Move waitlist signup</Heading>
        <Text style={text}><strong>Name:</strong> {name || '-'}</Text>
        <Text style={text}><strong>Stall name:</strong> {stallName || '-'}</Text>
        <Text style={text}><strong>WhatsApp number:</strong> {whatsapp || '-'}</Text>
        <Text style={text}><strong>Area:</strong> {area || '-'}</Text>
        <Text style={text}><strong>Biggest headache:</strong> {headache || '-'}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'New Kasi Move waitlist signup',
  displayName: 'Kasi Move waitlist signup (staff)',
  to: 'kasihubai@gmail.com',
  previewData: { name: 'Thandi', stallName: "Thandi's Kota", whatsapp: '+27791234567', area: 'Soweto' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '20px 25px' }
const h1 = { fontSize: '20px', color: '#00A86B' }
const text = { fontSize: '15px', color: '#111111', margin: '6px 0' }
