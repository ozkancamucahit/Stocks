export interface Stock {
    symbol: string
    name: string
    exchange: string
    mic_code: string
    currency: string
    datetime: string
    timestamp: number
    open: string
    high: string
    low: string
    close: string
    volume: string
    previous_close: string
    change: string
    percent_change: string
    average_volume: string
    is_market_open: boolean
    fifty_two_week: FiftyTwoWeek
  }
  
interface FiftyTwoWeek {
    low: string
    high: string
    low_change: string
    high_change: string
    low_change_percent: string
    high_change_percent: string
    range: string
  }