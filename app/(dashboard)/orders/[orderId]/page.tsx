"use client";
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItems/ItemsColumn";
import { DownloadIcon } from "lucide-react";

// Komponenta OrderDetails za prikaz detalja narudžbine
const OrderDetails = ({ params }: { params: { orderId: string }}) => {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Order ID from params:", params.orderId);

    const fetchOrderDetails = async () => {
      if (!params.orderId) {
        console.error("Order ID is undefined");
        return;
      }
      
      try {
        const url = `/api/orders/${params.orderId}`;
        console.log("Fetching from URL:", url);
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        console.log("Fetched data:", data);
        setOrderDetails(data.orderDetails);
        setCustomer(data.customer);
      } catch (error) {
        console.error("Error loading order details:", error);
      }
    };

    fetchOrderDetails();
  }, [params.orderId]);

  if (!orderDetails || !customer) return <div>Loading...</div>;

  const { street, city, postalCode, country } = orderDetails.shippingAddress;

  const downloadPDF = async () => {
    if (printRef.current) {
      try {
        await new Promise(resolve => setTimeout(resolve, 100));

        const canvas = await html2canvas(printRef.current, {
          scrollX: 0,
          scrollY: 0,
          useCORS: true,
          logging: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4"
        });

        const imgWidth = 210; 
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`order_${orderDetails._id}.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };

  return (
    <div className="relative p-6">
      <div className="absolute top-4 right-4">
        <button
          onClick={downloadPDF}
          className="bg-beige-2 text-white px-6 py-3 rounded flex items-center space-x-2"
        >
          <DownloadIcon className="h-5 w-5" />
          <span>Download PDF</span>
        </button>
      </div>

      {/* Container */}
      <div ref={printRef} className="pt-14 px-8 py-8 bg-gray-50 text-gray-900 max-w-3xl mx-auto border border-gray-200 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-emerald-600">Empearl Admin Portal</h1>
          <p className="text-sm mt-1 text-gray-500">Order Management Dashboard</p>
        </div>

        {/* Informacije o porudzbini */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="border border-gray-300 p-6 mb-6">
            <div className="flex justify-between">
              <div>
                <p className="text-lg font-bold">
                  Order ID: <span className="font-normal">{orderDetails._id}</span>
                </p>
                <p className="text-lg font-bold">
                  Customer: <span className="font-normal">{customer.name}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">
                  Date: <span className="font-normal">{new Date(orderDetails.createdAt).toLocaleDateString()}</span>
                </p>
                <p className="text-lg font-bold">
                  Total: <span className="font-normal">${orderDetails.totalAmount}</span>
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <div className="border border-gray-300 p-6">
            <p className="text-lg font-bold">
              Address:{" "}
              <span className="font-normal">{street}, {city}, {postalCode}, {country}</span>
            </p>
            <p className="text-lg font-bold">
              Shipping Rate ID: <span className="font-normal">{orderDetails.shippingRate}</span>
            </p>
          </div>
        </div>

        {/* Order Items Table */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Items</h2>
          <div className="border border-gray-300">
            <DataTable columns={columns} data={orderDetails.products} searchKey="product" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;