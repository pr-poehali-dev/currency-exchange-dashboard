import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Deal {
  id: number;
  date: string;
  month: string;
  number: string;
  client: string;
  direction: string;
  method: string;
  position: string;
  manager: string;
  amount: number;
  currency: string;
  rate: number;
  profit: number;
  status: 'completed' | 'pending' | 'cancelled';
}

const mockDeals: Deal[] = [
  {
    id: 1,
    date: '20-08-2025',
    month: 'авг 2025',
    number: '147',
    client: 'ТТ Банк',
    direction: 'USDT→THB',
    method: 'Свет',
    position: 'Покупка',
    manager: 'Марина',
    amount: 1600.00,
    currency: 'USDT',
    rate: 83.23,
    profit: 0.00,
    status: 'completed'
  },
  {
    id: 2,
    date: '20-08-2025',
    month: 'авг 2025',
    number: '146',
    client: 'ГАЕС_186',
    direction: 'USDT→THB',
    method: 'АТМ',
    position: 'Продажа',
    manager: 'Марина',
    amount: 715.00,
    currency: 'USDT',
    rate: 83.23,
    profit: 521.00,
    status: 'completed'
  },
  {
    id: 3,
    date: '20-08-2025',
    month: 'авг 2025',
    number: '145',
    client: 'Овод',
    direction: 'USDT→THB',
    method: 'Офис',
    position: 'Покупка',
    manager: 'Марина',
    amount: 200.00,
    currency: 'USDT',
    rate: 83.23,
    profit: 140.00,
    status: 'completed'
  },
  {
    id: 4,
    date: '20-08-2025',
    month: 'авг 2025',
    number: '144',
    client: 'Яндекс',
    direction: 'USDT→THB',
    method: 'Офис Ваймин',
    position: 'Обмен',
    manager: 'Валентин Ш',
    amount: 64627.00,
    currency: 'USDT',
    rate: 83.23,
    profit: 0.00,
    status: 'pending'
  },
];

const currencyRates = [
  { pair: 'EUR/USD', rate: 1.0892, change: 0.005, trend: 'up' },
  { pair: 'USDT/THB', rate: 83.23, change: -0.12, trend: 'down' },
  { pair: 'RUB/USD', rate: 0.011, change: 0.001, trend: 'up' },
  { pair: 'BTC/USDT', rate: 67542.30, change: 1240.50, trend: 'up' }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCurrency, setFilterCurrency] = useState('all');

  const filteredDeals = mockDeals.filter(deal => {
    const matchesSearch = deal.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.number.includes(searchTerm) ||
                         deal.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || deal.status === filterStatus;
    const matchesCurrency = filterCurrency === 'all' || deal.currency === filterCurrency;
    
    return matchesSearch && matchesStatus && matchesCurrency;
  });

  const totalProfit = mockDeals.reduce((sum, deal) => sum + deal.profit, 0);
  const totalVolume = mockDeals.reduce((sum, deal) => sum + deal.amount, 0);
  const completedDeals = mockDeals.filter(deal => deal.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-trading-blue rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" className="text-white" size={18} />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Currency Trading System</h1>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Экспорт
            </Button>
            <Button size="sm" className="bg-trading-blue hover:bg-blue-600">
              <Icon name="Plus" size={16} className="mr-2" />
              Новая сделка
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Icon name="TrendingUp" size={16} className="mr-2 text-trading-green" />
                Общая прибыль
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-trading-green">
                ${totalProfit.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-trading-green">↗ 12.5%</span> за месяц
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Icon name="DollarSign" size={16} className="mr-2 text-trading-blue" />
                Общий объем
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                ${totalVolume.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-trading-blue">↗ 8.2%</span> за неделю
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Icon name="CheckCircle" size={16} className="mr-2 text-trading-green" />
                Завершено сделок
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {completedDeals}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                из {mockDeals.length} всего
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Icon name="Activity" size={16} className="mr-2 text-trading-orange" />
                Средняя прибыль
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                ${(totalProfit / mockDeals.length).toFixed(0)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                на сделку
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Currency Rates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="BarChart3" size={20} className="mr-2" />
              Текущие курсы валют
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currencyRates.map((rate, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{rate.pair}</span>
                    <Icon 
                      name={rate.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                      size={16} 
                      className={rate.trend === 'up' ? 'text-trading-green' : 'text-trading-red'} 
                    />
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {rate.rate.toLocaleString()}
                  </div>
                  <div className={`text-sm ${rate.trend === 'up' ? 'text-trading-green' : 'text-trading-red'}`}>
                    {rate.change > 0 ? '+' : ''}{rate.change}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="Table" size={20} className="mr-2" />
              Таблица сделок
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Поиск по клиенту, номеру или менеджеру..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="completed">Завершено</SelectItem>
                  <SelectItem value="pending">В процессе</SelectItem>
                  <SelectItem value="cancelled">Отменено</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCurrency} onValueChange={setFilterCurrency}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Валюта" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все валюты</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="RUB">RUB</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Дата</TableHead>
                    <TableHead className="font-semibold">№</TableHead>
                    <TableHead className="font-semibold">Клиент</TableHead>
                    <TableHead className="font-semibold">Направление</TableHead>
                    <TableHead className="font-semibold">Способ</TableHead>
                    <TableHead className="font-semibold">Позиция</TableHead>
                    <TableHead className="font-semibold">Менеджер</TableHead>
                    <TableHead className="font-semibold text-right">Сумма</TableHead>
                    <TableHead className="font-semibold text-right">Курс</TableHead>
                    <TableHead className="font-semibold text-right">Прибыль</TableHead>
                    <TableHead className="font-semibold">Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDeals.map((deal) => (
                    <TableRow key={deal.id} className="hover:bg-gray-50">
                      <TableCell className="text-sm">{deal.date}</TableCell>
                      <TableCell className="text-sm font-medium">{deal.number}</TableCell>
                      <TableCell className="text-sm">{deal.client}</TableCell>
                      <TableCell className="text-sm">
                        <Badge variant="outline" className="text-xs">
                          {deal.direction}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{deal.method}</TableCell>
                      <TableCell className="text-sm">{deal.position}</TableCell>
                      <TableCell className="text-sm">{deal.manager}</TableCell>
                      <TableCell className="text-right text-sm font-medium">
                        {deal.amount.toLocaleString()} {deal.currency}
                      </TableCell>
                      <TableCell className="text-right text-sm">{deal.rate}</TableCell>
                      <TableCell className="text-right text-sm font-medium">
                        <span className={deal.profit > 0 ? 'text-trading-green' : deal.profit < 0 ? 'text-trading-red' : 'text-gray-500'}>
                          ${deal.profit.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={deal.status === 'completed' ? 'default' : deal.status === 'pending' ? 'secondary' : 'destructive'}
                          className="text-xs"
                        >
                          {deal.status === 'completed' ? 'Завершено' : 
                           deal.status === 'pending' ? 'В процессе' : 'Отменено'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;