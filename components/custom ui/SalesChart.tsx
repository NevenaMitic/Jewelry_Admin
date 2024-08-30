"use client"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

// Komponenta za prikaz grafikona prodaje
const SalesChart = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart className='w-full h-full' data={data} margin={{ top: 5, right:20, bottom: 5, left:0 }}>
         {/* Linija koja prikazuje podatke o prodaji */}
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip /> {/* Tooltip za prikaz informacija o tačkama na grafikonu */}
      </LineChart>
    </ResponsiveContainer>
  )
}

export default SalesChart