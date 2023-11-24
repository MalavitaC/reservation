import { gql, useQuery } from "@apollo/client"
import * as React from 'react'
import gqlClient from '@/lib/gqlClient'

export async function getList(params: any) {
  const where = params
  const {data} = await gqlClient.query({
    query: gql`
      query getList ($where: ReservationWhereInput) {
        getList (where: $where) {
          id
          guest_name
          gest_contact_info {
            phone
            mail
          }
          expected_arrival_time
          table_size
          status
        }
      }
    `,
    variables: {where},
    fetchPolicy: "cache-first"
  })
  return data
}

async function createReservation(params:any) {
  console.log('params', params)
  const {data} = await gqlClient.mutate({
    mutation: gql`
      mutation createReservation ($data: ReservationCreateInput!) {
        createReservation (data: $data) {
          id
          guest_name
          gest_contact_info {
            phone
            mail
          }
          expected_arrival_time
          table_size
        }
      }
    `,
    variables: {data: params}
  })
  return data
}

async function reschedule(params:any) {
  const {data} = await gqlClient.mutate({
    mutation: gql`
      mutation rescheduleReservation ($id: String!, $expected_arrival_time: DateTime!) {
        rescheduleReservation (id: $id, expected_arrival_time: $expected_arrival_time) {
          id
          guest_name
          gest_contact_info {
            phone
            mail
          }
          expected_arrival_time
          table_size
        }
      }
    `,
    variables: {
      id: params.id,
      expected_arrival_time: params.expected_arrival_time
    }
  })
  return data
}
async function deleteReservation(params:any) {
  const {data} = await gqlClient.mutate({
    mutation: gql`
      mutation deleteReservation ($id: String!) {
        deleteReservation (id: $id) {
          id
          guest_name
          gest_contact_info {
            phone
            mail
          }
          expected_arrival_time
          table_size
        }
      }
    `,
    variables: {
      id: params.id
    }
  })
  return data
}

export default {
  getList,
  createReservation,
  reschedule,
  deleteReservation
}