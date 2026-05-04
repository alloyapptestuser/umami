'use client';
import { Column, Grid, Heading, Icon, Row, Text } from '@umami/react-zen';
import { PageBody } from '@/components/common/PageBody';
import { PageHeader } from '@/components/common/PageHeader';
import { Badge } from '@/components/common/Badge';
import { useMessages } from '@/components/hooks';
import { Building2, ExternalLink, MapPin, Users, Calendar } from '@/components/icons';
import { FAVICON_URL } from '@/lib/constants';
import { type Company, companies } from './companies';

const pricingVariant: Record<Company['pricing'], 'good' | 'warning' | 'gray'> = {
  Free: 'good',
  Freemium: 'warning',
  Paid: 'gray',
};

function CompanyCard({ company }: { company: Company }) {
  const faviconSrc = FAVICON_URL.replace(/\{\{\s*domain\s*}}/, company.domain);

  return (
    <Column
      gap="4"
      padding="5"
      border
      borderRadius
      backgroundColor="surface-base"
      hover={{ backgroundColor: 'surface-sunken' }}
      style={{ transition: 'background-color 0.15s ease-in-out', height: '100%' }}
    >
      <Row alignItems="center" justifyContent="space-between" gap="3">
        <Row alignItems="center" gap="3" style={{ minWidth: 0 }}>
          <Row
            alignItems="center"
            justifyContent="center"
            backgroundColor="surface-sunken"
            borderRadius
            style={{ width: 40, height: 40, flexShrink: 0, overflow: 'hidden' }}
          >
            <img
              src={faviconSrc}
              width={24}
              height={24}
              alt={`${company.name} logo`}
              style={{ display: 'block' }}
            />
          </Row>
          <Column gap="1" style={{ minWidth: 0 }}>
            <Heading size="md" truncate>
              {company.name}
            </Heading>
            <Text color="muted" size="sm" truncate>
              {company.domain}
            </Text>
          </Column>
        </Row>
        <Badge variant={pricingVariant[company.pricing]} dot>
          {company.pricing}
        </Badge>
      </Row>

      <Text color="muted" size="sm" style={{ minHeight: 40 }}>
        {company.description}
      </Text>

      <Column gap="2">
        <Row alignItems="center" gap="2">
          <Icon size="sm" color="muted">
            <Building2 />
          </Icon>
          <Text size="sm">{company.category}</Text>
        </Row>
        <Row alignItems="center" gap="2">
          <Icon size="sm" color="muted">
            <MapPin />
          </Icon>
          <Text size="sm" truncate>
            {company.headquarters}
          </Text>
        </Row>
        <Row alignItems="center" gap="2">
          <Icon size="sm" color="muted">
            <Users />
          </Icon>
          <Text size="sm">{company.employees} employees</Text>
        </Row>
        <Row alignItems="center" gap="2">
          <Icon size="sm" color="muted">
            <Calendar />
          </Icon>
          <Text size="sm">Founded {company.founded}</Text>
        </Row>
      </Column>

      <Row
        alignItems="center"
        justifyContent="flex-end"
        gap="2"
        paddingTop="3"
        border="top"
      >
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 14,
            fontWeight: 500,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          Visit website
          <Icon size="sm">
            <ExternalLink />
          </Icon>
        </a>
      </Row>
    </Column>
  );
}

export function CompaniesPage() {
  const { t, labels } = useMessages();

  return (
    <PageBody>
      <Column gap="6" margin="2">
        <PageHeader title={t(labels.companies)} />
        <Grid
          columns={{ base: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }}
          gap="4"
        >
          {companies.map(company => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </Grid>
      </Column>
    </PageBody>
  );
}
