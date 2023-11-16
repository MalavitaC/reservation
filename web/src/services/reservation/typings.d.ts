declare namespace API {
  interface Reservation {
    id: string
    guest_name: string
    gest_contact_info: {
      phone: string
      mail: string
    }
    expected_arrival_time: string
    table_size: number
    owner: string
    status: string
  }
}