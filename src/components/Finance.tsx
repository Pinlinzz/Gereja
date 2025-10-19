import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { DollarSign, TrendingUp, Calendar, Plus, Download, TrendingDown, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import * as XLSX from 'xlsx';

// API Base URL - sesuaikan dengan backend Anda
const API_BASE_URL = 'http://localhost:3001/api/finance';

export function Finance() {
  const [financeData, setFinanceData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  
  // Form state
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    type: 'income',
    category: '',
    amount: '',
    notes: ''
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  // Fetch all data
  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchTransactions(),
        fetchMonthlyData(),
        fetchSummary(),
        fetchCategories()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions?limit=50`);
      const result = await response.json();
      if (result.success) {
        setFinanceData(result.data);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Fetch monthly data for charts
  const fetchMonthlyData = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const response = await fetch(`${API_BASE_URL}/monthly?year=${currentYear}`);
      const result = await response.json();
      if (result.success) {
        setMonthlyData(result.data);
      }
    } catch (error) {
      console.error('Error fetching monthly data:', error);
    }
  };

  // Fetch summary
  const fetchSummary = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const response = await fetch(`${API_BASE_URL}/summary?year=${currentYear}&month=${currentMonth}`);
      const result = await response.json();
      if (result.success) {
        setSummary(result.data);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      const result = await response.json();
      if (result.success) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle form submit
  const handleRecordSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert('Transaksi berhasil disimpan!');
        setIsRecordDialogOpen(false);
        
        // Reset form
        setFormData({
          date: new Date().toISOString().split('T')[0],
          description: '',
          type: 'income',
          category: '',
          amount: '',
          notes: ''
        });

        // Refresh data
        fetchAllData();
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
      alert('Error menyimpan transaksi');
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    try {
      // Prepare data for export
      const exportData = financeData.map(item => ({
        'Tanggal': new Date(item.date).toLocaleDateString('id-ID'),
        'Deskripsi': item.description,
        'Tipe': item.type === 'income' ? 'Pemasukan' : 'Pengeluaran',
        'Kategori': item.category,
        'Jumlah': item.amount,
        'Catatan': item.notes || '-'
      }));

      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(exportData);
      
      // Create workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Laporan Keuangan');
      
      // Generate filename with current date
      const fileName = `Laporan_Keuangan_${new Date().toLocaleDateString('id-ID').replace(/\//g, '-')}.xlsx`;
      
      // Save file
      XLSX.writeFile(wb, fileName);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Error saat export ke Excel');
    }
  };

  // Calculate metrics
  const monthlyIncome = summary.income;
  const monthlyExpense = summary.expense;
  const yearlyExpense = monthlyData.reduce((sum, item) => sum + (item.expense || 0), 0);
  const operationalExpense = financeData
    .filter(item => item.type === 'expense' && item.category === 'Operasional')
    .reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

  const filteredData = selectedType === 'all' 
    ? financeData 
    : financeData.filter(item => item.type === selectedType);

  // Filter categories based on transaction type
  const filteredCategories = categories.filter(cat => cat.type === formData.type);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Finance Management</h1>
          <p className="text-muted-foreground">
            Kelola keuangan dan laporan persembahan gereja
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportToExcel}>
            <Download className="h-4 w-4 mr-2" />
            Export to Excel
          </Button>
          <Dialog open={isRecordDialogOpen} onOpenChange={setIsRecordDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Record Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Record New Transaction</DialogTitle>
                <DialogDescription>
                  Tambahkan transaksi keuangan baru
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value, category: '' }))}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Pemasukan</SelectItem>
                      <SelectItem value="expense">Pengeluaran</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Tanggal
                  </Label>
                  <Input 
                    id="date" 
                    type="date" 
                    value={formData.date}
                    onChange={handleInputChange}
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Deskripsi
                  </Label>
                  <Input 
                    id="description" 
                    placeholder="Deskripsi transaksi" 
                    value={formData.description}
                    onChange={handleInputChange}
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Kategori
                  </Label>
                  <Select 
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredCategories.map(cat => (
                        <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Jumlah
                  </Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder="0" 
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Catatan
                  </Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Catatan tambahan..." 
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    className="col-span-3" 
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsRecordDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleRecordSubmit}>
                  Simpan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Persembahan Bulanan</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {monthlyIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Pemasukan bulan ini
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran Bulanan</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {monthlyExpense.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Pengeluaran bulan ini</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran Tahunan</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {yearlyExpense.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Akumulasi pengeluaran</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operasional Gereja</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {operationalExpense.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Biaya operasional</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Laporan Keuangan Bulanan</CardTitle>
            <CardDescription>Perbandingan pemasukan dan pengeluaran</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
                <Bar dataKey="income" fill="#10b981" name="Pemasukan" />
                <Bar dataKey="expense" fill="#ef4444" name="Pengeluaran" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trend Keuangan</CardTitle>
            <CardDescription>Grafik tren pemasukan dan pengeluaran</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Pemasukan" />
                <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} name="Pengeluaran" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi</CardTitle>
          <CardDescription>Daftar transaksi keuangan terbaru</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter transaksi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Transaksi</SelectItem>
                <SelectItem value="income">Pemasukan</SelectItem>
                <SelectItem value="expense">Pengeluaran</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(transaction.date).toLocaleDateString('id-ID')}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{transaction.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                      {transaction.type === 'income' ? '+' : '-'} Rp {parseFloat(transaction.amount).toLocaleString()}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Keuangan</CardTitle>
          <CardDescription>Total pemasukan dan pengeluaran</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Pemasukan</p>
              <p className="text-2xl font-bold text-green-600">Rp {summary.income.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Pengeluaran</p>
              <p className="text-2xl font-bold text-red-600">Rp {summary.expense.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Saldo</p>
              <p className="text-2xl font-bold text-blue-600">Rp {summary.balance.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
