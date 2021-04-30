import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import Layout from '../components/Layout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Container, Grid } from '@material-ui/core'
import { GLInput } from '../components/Common/Forms/GLInput'
import { GLIconInfo, GLIconNext, GLIconPrev } from '../components/Common/GLIcons'
import { GLTooltip } from '../components/Common/GLTooltip'
import { GLSwitch } from '../components/Common/GLSwitch'
import { GLSelect } from '../components/Common/Forms/GLSelect'
import { GLRangeButton } from '../components/Common/Forms/GLRangeButton'
import { GLButton } from '../components/Common/Forms/GLButtons'
import { colors } from '../theme'

const forms: NextPage = () => {
  return (
    <Layout>
      <br />
      <br />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <GLInput
              placeholder="Placeholder"
              label="Input Label"
              labelIcon={
                <GLTooltip title="Title Tooltip Text">
                  <GLIconInfo />
                </GLTooltip>
              }
            />
          </Grid>
          <Grid item xs={6}>
            <GLInput
              placeholder="Placeholder Tooltip"
              label="Input Tooltip"
              labelIcon={
                <GLTooltip title="Tooltip Text">
                  <GLIconInfo />
                </GLTooltip>
              }
            />
          </Grid>
          <Grid item xs={6}>
            <GLSwitch
              label="Switch Label"
              labelPosition="top"
              value={true}
              onChange={() => {
                console.log('test')
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <GLSelect
              label="Select Label"
              labelIcon={
                <GLTooltip title="Tooltip Text">
                  <GLIconInfo />
                </GLTooltip>
              }
              data={[
                {
                  id: 1,
                  label: 'Menu Item 1',
                },
                {
                  id: 2,
                  label: 'Menu Item 2',
                },
                {
                  id: 3,
                  label: 'Menu Item 3',
                },
              ]}
            />
          </Grid>
          <Grid item xs={6}>
            <GLRangeButton
              label="Range Title"
              value={1}
              onChange={() => {
                console.log('test')
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <GLButton
              bgColor={colors.sea}
              bgColorHover={colors.seaHover}
              text="GLButtonIcon"
              textColor={colors.white}
              textColorHover={colors.white}
              iconSize="12px"
              startIcon={<GLIconPrev />}
            />
          </Grid>
          <Grid item xs={3}>
            <GLButton
              bgColor={colors.sea}
              bgColorHover={colors.seaHover}
              text="GLButtonIcon"
              textColor={colors.white}
              textColorHover={colors.white}
              iconSize="8px"
              endIcon={<GLIconNext />}
            />
          </Grid>
        </Grid>
      </Container>
      <br />
      <br />
    </Layout>
  )
}

export default forms

export const getServerSideProps: GetServerSideProps = async (
  serverSideContext: GetServerSidePropsContext
) => {
  return {
    props: {
      ...(await serverSideTranslations(serverSideContext?.locale as string, ['common'])),
    },
  }
}
