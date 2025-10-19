import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Plus, Calendar as CalendarIcon, Clock, MapPin, User, Edit, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Alert, AlertDescription } from './ui/alert';

const API_URL = 'http://localhost:3001/api';

interface Event {
  id: number;
  nama_kegiatan: string;
  deskripsi: string | null;
  kategori: 'Misa & Liturgi' | 'Kegiatan Komunitas' | 'Doa & Devosi' | 'Pastoral & Acara Khusus';
  waktu_mulai: string;
  waktu_selesai: string | null;
  lokasi: string;
  penanggung_jawab: string | null;
  kontak: string | null;
  created_at: string;
}

interface NewEventForm {
  nama_kegiatan: string;
  deskripsi: string;
  kategori: string;
  waktu_mulai: string;
  waktu_selesai: string;
  lokasi: string;
  penanggung_jawab: string;
  kontak: string;
}

export function Events() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedKategori, setSelectedKategori] = useState('all');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories] = useState([
    'Misa & Liturgi',
    'Kegiatan Komunitas',
    'Doa & Devosi',
    'Pastoral & Acara Khusus'
  ]);

  const [newEvent, setNewEvent] = useState<NewEventForm>({
    nama_kegiatan: '',
    deskripsi: '',
    kategori: 'Misa & Liturgi',
    waktu_mulai: '',
    waktu_selesai: '',
    lokasi: 'Gereja Utama',
    penanggung_jawab: '',
    kontak: ''
  });

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/events`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setEvents(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch events');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Gagal memuat data kegiatan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter events by kategori
  const filteredEvents = events.filter(event => {
    if (selectedKategori === 'all') return true;
    return event.kategori === selectedKategori;
  });

  // Get events for selected date
  const eventsOnSelectedDate = selectedDate
    ? events.filter(event => {
        const eventDate = new Date(event.waktu_mulai);
        return (
          eventDate.getDate() === selectedDate.getDate() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : [];

  // Get upcoming events (next 2 weeks)
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
  
  const upcomingEvents = events
    .filter(event => {
      const eventDate = new Date(event.waktu_mulai);
      return eventDate >= new Date() && eventDate <= twoWeeksFromNow;
    })
    .sort((a, b) => new Date(a.waktu_mulai).getTime() - new Date(b.waktu_mulai).getTime());

  // Calculate stats
  const currentDate = new Date();
  const thisWeekEvents = events.filter(event => {
    const eventDate = new Date(event.waktu_mulai);
    const weekFromNow = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    return eventDate >= currentDate && eventDate <= weekFromNow;
  }).length;

  const thisMonthEvents = events.filter(event => {
    const eventDate = new Date(event.waktu_mulai);
    return (
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear()
    );
  }).length;

  const getKategoriColor = (kategori: string) => {
    switch (kategori) {
      case 'Misa & Liturgi': return 'bg-blue-100 text-blue-800';
      case 'Kegiatan Komunitas': return 'bg-green-100 text-green-800';
      case 'Doa & Devosi': return 'bg-purple-100 text-purple-800';
      case 'Pastoral & Acara Khusus': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short'
    });
  };

  const handleCreateEvent = async () => {
    try {
      // Validation
      if (!newEvent.nama_kegiatan || !newEvent.waktu_mulai) {
        toast.error('Nama kegiatan dan waktu mulai harus diisi');
        return;
      }

      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Kegiatan berhasil ditambahkan');
        setIsAddEventOpen(false);
        fetchEvents();
        // Reset form
        setNewEvent({
          nama_kegiatan: '',
          deskripsi: '',
          kategori: 'Misa & Liturgi',
          waktu_mulai: '',
          waktu_selesai: '',
          lokasi: 'Gereja Utama',
          penanggung_jawab: '',
          kontak: ''
        });
      } else {
        throw new Error(data.error || 'Failed to create event');
      }
    } catch (err) {
      toast.error('Gagal menambahkan kegiatan');
      console.error(err);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus kegiatan ini?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Kegiatan berhasil dihapus');
        fetchEvents();
      } else {
        throw new Error(data.error || 'Failed to delete event');
      }
    } catch (err) {
      toast.error('Gagal menghapus kegiatan');
      console.error(err);
    }
  };

  // Get dates that have events for calendar highlighting
  const datesWithEvents = events.map(event => new Date(event.waktu_mulai));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Kalender Kegiatan</h1>
          <p className="text-muted-foreground">
            Kelola jadwal kegiatan dan acara Gereja Damai Kristus
          </p>
        </div>
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Kegiatan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Kegiatan Baru</DialogTitle>
              <DialogDescription>
                Buat jadwal kegiatan atau acara baru
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nama_kegiatan">Nama Kegiatan *</Label>
                <Input
                  id="nama_kegiatan"
                  value={newEvent.nama_kegiatan}
                  onChange={(e) => setNewEvent({ ...newEvent, nama_kegiatan: e.target.value })}
                  placeholder="Contoh: Misa Minggu Pagi"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="kategori">Kategori *</Label>
                <Select
                  value={newEvent.kategori}
                  onValueChange={(value) => setNewEvent({ ...newEvent, kategori: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="waktu_mulai">Waktu Mulai *</Label>
                  <Input
                    id="waktu_mulai"
                    type="datetime-local"
                    value={newEvent.waktu_mulai}
                    onChange={(e) => setNewEvent({ ...newEvent, waktu_mulai: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="waktu_selesai">Waktu Selesai</Label>
                  <Input
                    id="waktu_selesai"
                    type="datetime-local"
                    value={newEvent.waktu_selesai}
                    onChange={(e) => setNewEvent({ ...newEvent, waktu_selesai: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lokasi">Lokasi</Label>
                <Input
                  id="lokasi"
                  value={newEvent.lokasi}
                  onChange={(e) => setNewEvent({ ...newEvent, lokasi: e.target.value })}
                  placeholder="Gereja Utama"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="penanggung_jawab">Penanggung Jawab</Label>
                <Input
                  id="penanggung_jawab"
                  value={newEvent.penanggung_jawab}
                  onChange={(e) => setNewEvent({ ...newEvent, penanggung_jawab: e.target.value })}
                  placeholder="Nama penanggung jawab"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="kontak">Kontak</Label>
                <Input
                  id="kontak"
                  value={newEvent.kontak}
                  onChange={(e) => setNewEvent({ ...newEvent, kontak: e.target.value })}
                  placeholder="Nomor telepon / email"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="deskripsi">Deskripsi</Label>
                <Textarea
                  id="deskripsi"
                  value={newEvent.deskripsi}
                  onChange={(e) => setNewEvent({ ...newEvent, deskripsi: e.target.value })}
                  placeholder="Deskripsi kegiatan..."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleCreateEvent}>
                Simpan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Minggu Ini</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisWeekEvents}</div>
            <p className="text-xs text-muted-foreground">kegiatan terjadwal</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bulan Ini</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisMonthEvents}</div>
            <p className="text-xs text-muted-foreground">total kegiatan</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kegiatan</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
            <p className="text-xs text-muted-foreground">dalam database</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">2 Minggu Ke Depan</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
            <p className="text-xs text-muted-foreground">kegiatan mendatang</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Kalender</CardTitle>
            <CardDescription>Pilih tanggal untuk melihat kegiatan</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            
            {/* Events on selected date */}
            {selectedDate && eventsOnSelectedDate.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-sm">
                  Kegiatan pada {formatDateShort(selectedDate.toISOString())}:
                </h4>
                {eventsOnSelectedDate.map((event) => (
                  <div key={event.id} className="text-sm p-2 bg-muted rounded">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(event.waktu_mulai)}</span>
                    </div>
                    <div className="font-medium mt-1">{event.nama_kegiatan}</div>
                    <Badge className={`${getKategoriColor(event.kategori)} mt-1`} variant="secondary">
                      {event.kategori}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
            
            {selectedDate && eventsOnSelectedDate.length === 0 && (
              <div className="mt-4 text-sm text-muted-foreground text-center py-4">
                Tidak ada kegiatan pada tanggal ini
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Kegiatan Mendatang</CardTitle>
            <CardDescription>Jadwal kegiatan dalam 2 minggu ke depan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Tidak ada kegiatan dalam 2 minggu ke depan
                </div>
              ) : (
                upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex-shrink-0 text-center">
                      <div className="text-lg font-semibold">
                        {new Date(event.waktu_mulai).getDate()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(event.waktu_mulai).toLocaleDateString('id-ID', { month: 'short' })}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-medium">{event.nama_kegiatan}</h4>
                        <Badge className={getKategoriColor(event.kategori)} variant="secondary">
                          {event.kategori}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(event.waktu_mulai)}
                          {event.waktu_selesai && ` - ${formatTime(event.waktu_selesai)}`}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.lokasi}
                        </div>
                        {event.penanggung_jawab && (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {event.penanggung_jawab}
                          </div>
                        )}
                      </div>
                      {event.deskripsi && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {event.deskripsi}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Events List */}
      <Card>
        <CardHeader>
          <CardTitle>Semua Kegiatan</CardTitle>
          <CardDescription>
            Daftar lengkap jadwal kegiatan gereja
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={selectedKategori} onValueChange={setSelectedKategori}>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Filter kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Tidak ada kegiatan ditemukan
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div key={event.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h4 className="font-medium">{event.nama_kegiatan}</h4>
                      <Badge className={getKategoriColor(event.kategori)} variant="secondary">
                        {event.kategori}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {formatDate(event.waktu_mulai)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(event.waktu_mulai)}
                        {event.waktu_selesai && ` - ${formatTime(event.waktu_selesai)}`}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.lokasi}
                      </div>
                      {event.penanggung_jawab && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {event.penanggung_jawab}
                        </div>
                      )}
                    </div>
                    {event.deskripsi && (
                      <p className="text-sm text-muted-foreground">{event.deskripsi}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
