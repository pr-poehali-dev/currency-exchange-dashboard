import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
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
  rate1: number;
  rate2: number;
  rate3: number;
  commission: number;
  profit: number;
  profitPercent: number;
  received: number;
  forVerification: number;
  whoToPay: string;
  income: number;
  incomePercent: number;
}

const mockDeals: Deal[] = [
  {
    id: 147,
    date: '20-08-2025',
    month: 'авг 2025',
    number: '147',
    client: 'без тела',
    direction: 'USDT→THB',
    method: 'Свет',
    position: 'Покупка',
    manager: 'Марина',
    amount: 1600.00,
    currency: 'USDT',
    rate1: 83.23,
    rate2: 83.23,
    rate3: 83.23,
    commission: 32.20,
    profit: 0.00,
    profitPercent: 0.00,
    received: 1400.00,
    forVerification: 44100.00,
    whoToPay: '',
    income: 980.00,
    incomePercent: 2.22
  },
  {
    id: 146,
    date: '20-08-2025',
    month: 'авг 2025',
    number: '146',
    client: 'ГАЕС_186',
    direction: 'USDT→THB',
    method: 'АТМ',
    position: 'Паттайя',
    manager: 'Марина',
    amount: 715.00,
    currency: 'USDT',
    rate1: 83.23,
    rate2: 83.23,
    rate3: 83.23,
    commission: 32.20,
    profit: 524.42,
    profitPercent: 0.00,
    received: 324.42,
    forVerification: 59550.00,
    whoToPay: '',
    income: 445.75,
    incomePercent: 4.40
  },
  {
    id: 145,
    date: '20-08-2025',
    month: 'авг 2025',
    number: '145',
    client: 'Овод ЗГП Дорожный',
    direction: 'USDT→THB',
    method: 'Офис',
    position: 'Паттайя',
    manager: 'Марина',
    amount: 200.00,
    currency: 'USDT',
    rate1: 83.23,
    rate2: 83.23,
    rate3: 83.23,
    commission: 32.20,
    profit: 0.00,
    profitPercent: 0.00,
    received: 715.00,
    forVerification: 22200.00,
    whoToPay: '',
    income: 523.00,
    incomePercent: 2.22
  },
  {
    id: 144,
    date: '20-08-2025',
    month: 'авг 2025',
    number: '144',
    client: 'Ярослав',
    direction: 'USDT→THB',
    method: 'Офис Бангкок',
    position: 'Паттайя',
    manager: 'Валентин Ш',
    amount: 64627.00,
    currency: 'USDT',
    rate1: 83.23,
    rate2: 83.23,
    rate3: 83.23,
    commission: 32.20,
    profit: 0.00,
    profitPercent: 0.00,
    received: 64627.00,
    forVerification: 2193200.00,
    whoToPay: '',
    income: 49583.40,
    incomePercent: 2.45
  },
  {
    id: 129,
    date: '20-08-2025',
    month: 'авг 2025',
    number: '129',
    client: 'ТФ',
    direction: 'RUB→THB',
    method: 'АТМ',
    position: 'Паттайя',
    manager: 'Диана',
    amount: 8500.00,
    currency: 'RUB',
    rate1: 83.23,
    rate2: 83.23,
    rate3: 83.23,
    commission: 32.20,
    profit: 97.32,
    profitPercent: 0.00,
    received: 97.32,
    forVerification: 3000.00,
    whoToPay: 'ПСК_С6н',
    income: 133.73,
    incomePercent: 4.46
  },
  {
    id: 128,
    date: '20-08-2025',
    month: 'авг 2025',
    number: '128',
    client: 'ГАЕС_186',
    direction: 'RUB→THB',
    method: 'АТМ',
    position: 'Паттайя',
    manager: 'Диана',
    amount: 10000.00,
    currency: 'RUB',
    rate1: 83.23,
    rate2: 83.23,
    rate3: 83.23,
    commission: 32.20,
    profit: 120.15,
    profitPercent: 0.00,
    received: 120.15,
    forVerification: 3700.00,
    whoToPay: 'ПСК_С6н',
    income: 168.80,
    incomePercent: 4.56
  }
];

const getCurrencyPairColor = (direction: string) => {
  if (direction.includes('USDT→THB')) return 'bg-purple-100 text-purple-800 border-purple-300';
  if (direction.includes('RUB→THB')) return 'bg-green-100 text-green-800 border-green-300';
  if (direction.includes('USD→THB')) return 'bg-blue-100 text-blue-800 border-blue-300';
  return 'bg-gray-100 text-gray-800 border-gray-300';
};

const getMethodColor = (method: string) => {
  if (method === 'Свет') return 'bg-orange-100 text-orange-800 border-orange-300';
  if (method === 'АТМ') return 'bg-cyan-100 text-cyan-800 border-cyan-300';
  if (method === 'Офис' || method.includes('Офис')) return 'bg-pink-100 text-pink-800 border-pink-300';
  return 'bg-gray-100 text-gray-800 border-gray-300';
};

const Index = () => {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Функция для загрузки данных через API
  const fetchDeals = async () => {
    setLoading(true);
    try {
      // Здесь будет ваш API endpoint
      // const response = await fetch('/api/deals');
      // const data = await response.json();
      // setDeals(data);
      
      // Пока используем mock данные
      setTimeout(() => {
        setDeals(mockDeals);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const filteredDeals = deals.filter(deal => {
    const searchLower = searchTerm.toLowerCase();
    return (
      deal.client.toLowerCase().includes(searchLower) ||
      deal.number.includes(searchTerm) ||
      deal.manager.toLowerCase().includes(searchLower) ||
      deal.direction.toLowerCase().includes(searchLower)
    );
  });

  const totalProfit = deals.reduce((sum, deal) => sum + deal.profit, 0);
  const totalIncome = deals.reduce((sum, deal) => sum + deal.income, 0);

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
              <h1 className="text-xl font-semibold text-gray-900">Таблица валютных сделок</h1>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={fetchDeals}
              disabled={loading}
            >
              <Icon name={loading ? "Loader2" : "RefreshCw"} size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
              Обновить
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Экспорт Excel
            </Button>
            <Button size="sm" className="bg-trading-blue hover:bg-blue-600">
              <Icon name="Plus" size={16} className="mr-2" />
              Новая сделка
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Всего сделок</p>
                  <p className="text-2xl font-bold">{deals.length}</p>
                </div>
                <Icon name="FileText" className="text-trading-blue" size={24} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Общая прибыль</p>
                  <p className="text-2xl font-bold text-trading-green">${totalProfit.toLocaleString()}</p>
                </div>
                <Icon name="TrendingUp" className="text-trading-green" size={24} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Общий доход</p>
                  <p className="text-2xl font-bold text-trading-blue">${totalIncome.toLocaleString()}</p>
                </div>
                <Icon name="DollarSign" className="text-trading-blue" size={24} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Средний % дохода</p>
                  <p className="text-2xl font-bold text-trading-orange">
                    {(deals.reduce((sum, deal) => sum + deal.incomePercent, 0) / deals.length).toFixed(2)}%
                  </p>
                </div>
                <Icon name="Percent" className="text-trading-orange" size={24} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Input
              placeholder="Поиск по клиенту, номеру, менеджеру или направлению..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </CardContent>
        </Card>

        {/* Main Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-green-100 border-b-2 border-green-300">
                    <TableHead className="text-xs font-bold text-center border-r border-green-300 bg-green-200 p-2 w-20">Дата</TableHead>
                    <TableHead className="text-xs font-bold text-center border-r border-green-300 bg-green-200 p-2 w-20">Месяц</TableHead>
                    <TableHead className="text-xs font-bold text-center border-r border-green-300 bg-green-200 p-2 w-24">№ сделки<br/>(кол-во)</TableHead>
                    <TableHead className="text-xs font-bold text-center border-r border-green-300 bg-green-200 p-2 w-32">Р/Е код</TableHead>
                    <TableHead className="text-xs font-bold text-center border-r border-green-300 bg-green-200 p-2 w-28">Направление</TableHead>
                    <TableHead className="text-xs font-bold text-center border-r border-green-300 bg-green-200 p-2 w-28">Способ<br/>выдачи</TableHead>
                    <TableHead className="text-xs font-bold text-center border-r border-green-300 bg-green-200 p-2 w-24">Локация</TableHead>
                    <TableHead className="text-xs font-bold text-center border-r border-green-300 bg-green-200 p-2 w-28">Менеджер</TableHead>
                    <TableHead className="text-xs font-bold text-center border-r border-cyan-300 bg-cyan-200 p-2 w-28">Сколько<br/>мы<br/>получаем</TableHead>
                    <TableHead className="text-xs font-bold text-center border-r border-cyan-300 bg-cyan-200 p-2 w-20">Валюта<br/>приема</TableHead>
                    <TableHead className="text-xs font-bold text-center border-r border-pink-300 bg-pink-200 p-2 w-20">Приемка</TableHead>
                    <TableHead className="text-xs font-bold text-center border-r border-pink-300 bg-pink-200 p-2 w-32">Правая сделка</TableHead>
                    <TableHead className="text-xs font-bold text-center border-r border-pink-300 bg-pink-200 p-2 w-24">Приемка<br/>должны<br/>отдать</TableHead>
                    <TableHead className="text-xs font-bold text-center border-r border-gray-300 p-2 w-28">Для<br/>проверки</TableHead>
                    <TableHead className="text-xs font-bold text-center border-r border-gray-300 p-2 w-24">Кто<br/>выдаем</TableHead>
                    <TableHead className="text-xs font-bold text-center border-r border-gray-300 p-2 w-24">Доход,<br/>318</TableHead>
                    <TableHead className="text-xs font-bold text-center border-gray-300 p-2 w-20">Доход, %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDeals.map((deal, index) => (
                    <TableRow key={deal.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 border-b`}>
                      <TableCell className="text-xs text-center border-r border-gray-200 p-2">{deal.date}</TableCell>
                      <TableCell className="text-xs text-center border-r border-gray-200 p-2">{deal.month}</TableCell>
                      <TableCell className="text-xs text-center border-r border-gray-200 p-2 font-medium">{deal.number}</TableCell>
                      <TableCell className="text-xs text-left border-r border-gray-200 p-2">{deal.client}</TableCell>
                      <TableCell className="text-center border-r border-gray-200 p-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getCurrencyPairColor(deal.direction)}`}>
                          {deal.direction}
                        </span>
                      </TableCell>
                      <TableCell className="text-center border-r border-gray-200 p-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getMethodColor(deal.method)}`}>
                          {deal.method}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-center border-r border-gray-200 p-2">{deal.position}</TableCell>
                      <TableCell className="text-xs text-center border-r border-gray-200 p-2">{deal.manager}</TableCell>
                      <TableCell className="text-xs text-right border-r border-gray-200 p-2 font-medium bg-cyan-50">
                        {deal.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-xs text-center border-r border-gray-200 p-2 bg-cyan-50">{deal.currency}</TableCell>
                      <TableCell className="text-xs text-right border-r border-gray-200 p-2 bg-pink-50">
                        {deal.rate1.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-xs text-right border-r border-gray-200 p-2 bg-pink-50">
                        {deal.rate2.toFixed(2)} | {deal.rate3.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-xs text-center border-r border-gray-200 p-2 bg-pink-50">
                        <Checkbox className="w-4 h-4" />
                      </TableCell>
                      <TableCell className="text-xs text-right border-r border-gray-200 p-2 font-medium">
                        {deal.forVerification.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </TableCell>
                      <TableCell className="text-xs text-center border-r border-gray-200 p-2">{deal.whoToPay}</TableCell>
                      <TableCell className="text-xs text-right border-r border-gray-200 p-2 font-medium text-trading-green">
                        {deal.income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-xs text-right p-2 font-medium text-trading-green">
                        {deal.incomePercent.toFixed(2)}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* API Integration Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Icon name="Code" size={16} className="mr-2" />
              API Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600">
            <p>Для подключения API данных обновите функцию <code className="bg-gray-100 px-2 py-1 rounded">fetchDeals()</code> в файле с вашим endpoint:</p>
            <div className="bg-gray-100 p-3 rounded-md mt-2 font-mono text-xs">
              const response = await fetch('/api/deals');<br/>
              const data = await response.json();<br/>
              setDeals(data);
            </div>
            <p className="mt-3">Формат данных должен соответствовать интерфейсу <code className="bg-gray-100 px-2 py-1 rounded">Deal</code> со всеми необходимыми полями.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;