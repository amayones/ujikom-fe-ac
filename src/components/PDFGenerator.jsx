import { useState } from 'react';
import { Download, FileText, Loader, AlertCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import useAuthStore from '../store/authStore';
import { ROLES } from '../utils/roles';
import { toast } from 'react-toastify';

// PDF Generator component for Owner reports
const PDFGenerator = ({ data, reportType, title, onError }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { user } = useAuthStore();

  // Only show for Owner role
  if (user?.role !== ROLES.OWNER) {
    return null;
  }

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      // Validate data
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid data provided for PDF generation');
      }

      // Validate required fields based on report type
      if (reportType === 'financial' && !data.totalRevenue && data.totalRevenue !== 0) {
        throw new Error('Financial data is incomplete');
      }
      
      if (reportType === 'transactions' && !data.transactions) {
        throw new Error('Transaction data is missing');
      }
      
      if (reportType === 'summary' && !data.activeFilms && data.activeFilms !== 0) {
        throw new Error('Summary data is incomplete');
      }

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      
      // Header
      doc.setFontSize(20);
      doc.setTextColor(40, 40, 40);
      doc.text('ABSOLUTE CINEMA', pageWidth / 2, 20, { align: 'center' });
      
      doc.setFontSize(16);
      doc.text(title || 'Report', pageWidth / 2, 35, { align: 'center' });
      
      // Date
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleDateString('id-ID')}`, pageWidth / 2, 45, { align: 'center' });
      
      // Line separator
      doc.setDrawColor(200, 200, 200);
      doc.line(20, 50, pageWidth - 20, 50);
      
      let yPosition = 60;
      
      try {
        if (reportType === 'financial') {
          generateFinancialReport(doc, data, yPosition);
        } else if (reportType === 'transactions') {
          generateTransactionReport(doc, data, yPosition);
        } else if (reportType === 'summary') {
          generateSummaryReport(doc, data, yPosition);
        } else {
          throw new Error(`Unknown report type: ${reportType}`);
        }
      } catch (reportError) {
        console.error('Error generating report content:', reportError);
        // Add error message to PDF
        doc.setFontSize(12);
        doc.setTextColor(200, 0, 0);
        doc.text('Error generating report content. Using available data.', 20, yPosition + 20);
      }
      
      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' });
      }
      
      // Save PDF
      const fileName = `${reportType}_report_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      
      toast.success('PDF exported successfully!');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      const errorMessage = error.message || 'Unknown error occurred';
      toast.error(`Failed to generate PDF: ${errorMessage}`);
      if (onError) onError(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFinancialReport = (doc, data, startY) => {
    try {
      // Summary section
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text('Financial Summary', 20, startY);
      
      const totalRevenue = Number(data.totalRevenue) || 0;
      const totalExpenses = Number(data.totalExpenses) || 0;
      const netProfit = totalRevenue - totalExpenses;
      const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : 0;
      
      const summaryData = [
        ['Total Revenue', `Rp ${totalRevenue.toLocaleString('id-ID')}`],
        ['Total Expenses', `Rp ${totalExpenses.toLocaleString('id-ID')}`],
        ['Net Profit', `Rp ${netProfit.toLocaleString('id-ID')}`],
        ['Profit Margin', `${profitMargin}%`],
        ['Total Transactions', (data.totalTransactions || 0).toString()],
      ];
    
    doc.autoTable({
      startY: startY + 10,
      head: [['Metric', 'Value']],
      body: summaryData,
      theme: 'grid',
      headStyles: { fillColor: [34, 197, 94] },
      margin: { left: 20, right: 20 }
    });
    
      // Monthly breakdown if available
      if (data.monthlyData && Array.isArray(data.monthlyData) && data.monthlyData.length > 0) {
        doc.setFontSize(14);
        doc.text('Monthly Breakdown', 20, doc.lastAutoTable.finalY + 20);
        
        const monthlyTableData = data.monthlyData.map(item => [
          item.month || 'Unknown',
          `Rp ${(Number(item.revenue) || 0).toLocaleString('id-ID')}`,
          `Rp ${(Number(item.expenses) || 0).toLocaleString('id-ID')}`,
          `Rp ${((Number(item.revenue) || 0) - (Number(item.expenses) || 0)).toLocaleString('id-ID')}`
        ]);
        
        doc.autoTable({
          startY: doc.lastAutoTable.finalY + 30,
          head: [['Month', 'Revenue', 'Expenses', 'Profit']],
          body: monthlyTableData,
          theme: 'striped',
          headStyles: { fillColor: [34, 197, 94] },
          margin: { left: 20, right: 20 }
        });
      }
    } catch (error) {
      console.error('Error in generateFinancialReport:', error);
      doc.setFontSize(12);
      doc.setTextColor(200, 0, 0);
      doc.text('Error generating financial report content', 20, startY + 20);
    }
  };

  const generateTransactionReport = (doc, data, startY) => {
    try {
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text('Transaction Report', 20, startY);
      
      if (data.transactions && Array.isArray(data.transactions) && data.transactions.length > 0) {
        const transactionData = data.transactions.slice(0, 50).map(transaction => [
          transaction.id || '-',
          transaction.customer_name || '-',
          transaction.film_title || '-',
          transaction.created_at ? new Date(transaction.created_at).toLocaleDateString('id-ID') : '-',
          `Rp ${(Number(transaction.total_amount) || 0).toLocaleString('id-ID')}`,
          transaction.status || '-'
        ]);
        
        if (data.transactions.length > 50) {
          doc.setFontSize(10);
          doc.setTextColor(100, 100, 100);
          doc.text(`Showing first 50 of ${data.transactions.length} transactions`, 20, startY + 5);
        }
        
        doc.autoTable({
          startY: startY + 10,
          head: [['ID', 'Customer', 'Film', 'Date', 'Amount', 'Status']],
          body: transactionData,
          theme: 'striped',
          headStyles: { fillColor: [34, 197, 94] },
          margin: { left: 20, right: 20 },
          styles: { fontSize: 8 }
        });
      } else {
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text('No transaction data available', 20, startY + 20);
      }
    } catch (error) {
      console.error('Error in generateTransactionReport:', error);
      doc.setFontSize(12);
      doc.setTextColor(200, 0, 0);
      doc.text('Error generating transaction report content', 20, startY + 20);
    }
  };

  const generateSummaryReport = (doc, data, startY) => {
    try {
      doc.setFontSize(14);
      doc.setTextColor(40, 40, 40);
      doc.text('Business Summary', 20, startY);
      
      // Key metrics
      const metricsData = [
        ['Active Films', (Number(data.activeFilms) || 0).toString()],
        ['Total Customers', (Number(data.totalCustomers) || 0).toString()],
        ['Monthly Revenue', `Rp ${(Number(data.monthlyRevenue) || 0).toLocaleString('id-ID')}`],
        ['Occupancy Rate', `${(Number(data.occupancyRate) || 0)}%`],
        ['Customer Satisfaction', `${(Number(data.customerSatisfaction) || 0)}%`]
      ];
      
      doc.autoTable({
        startY: startY + 10,
        head: [['Metric', 'Value']],
        body: metricsData,
        theme: 'grid',
        headStyles: { fillColor: [34, 197, 94] },
        margin: { left: 20, right: 20 }
      });
      
      // Top performing films if available
      if (data.topFilms && Array.isArray(data.topFilms) && data.topFilms.length > 0) {
        doc.setFontSize(14);
        doc.text('Top Performing Films', 20, doc.lastAutoTable.finalY + 20);
        
        const filmsData = data.topFilms.map(film => [
          film.title || '-',
          (Number(film.total_bookings) || 0).toString(),
          `Rp ${(Number(film.total_revenue) || 0).toLocaleString('id-ID')}`
        ]);
        
        doc.autoTable({
          startY: doc.lastAutoTable.finalY + 30,
          head: [['Film Title', 'Bookings', 'Revenue']],
          body: filmsData,
          theme: 'striped',
          headStyles: { fillColor: [34, 197, 94] },
          margin: { left: 20, right: 20 }
        });
      }
    } catch (error) {
      console.error('Error in generateSummaryReport:', error);
      doc.setFontSize(12);
      doc.setTextColor(200, 0, 0);
      doc.text('Error generating summary report content', 20, startY + 20);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isGenerating ? (
        <Loader size={16} className="mr-2 animate-spin" />
      ) : (
        <Download size={16} className="mr-2" />
      )}
      {isGenerating ? 'Generating...' : 'Export PDF'}
    </button>
  );
};

export default PDFGenerator;