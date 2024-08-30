import { DataTable } from '@/components/custom ui/DataTable'
import { columns } from '@/components/customers/CustomerColumns'
import { Separator } from '@/components/ui/separator'
import Customer from '@/library/models/Customer'
import { connectToDB } from '@/library/mongoDB'

// Komponenta Customers za prikaz liste kupaca
const Customers = async () => {
  await connectToDB()

// Dohvatanje svih kupaca iz baze, sortirano po datumu kreiranja u opadajućem redosledu
  const customers = await Customer.find().sort({ createdAt: "desc" })

  return (
    <div className='px-10 py-5'>
      <p className='text-heading2-bold'>Customers</p>
      <Separator className='bg-grey-1 my-5' />
      <DataTable columns={columns} data={customers} searchKey='name'/>
    </div>
  )
}

export const dynamic = "force-dynamic"; // Dinamičnost stranice

export default Customers