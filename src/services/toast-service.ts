import { toast } from 'sonner'

export class ToastService {
  private static baseOptions = {
    position: 'top-center' as const, // aparece centralizado no topo
    duration: 3000,
  }

  private static baseStyle = {
    color: '#fff',
  }

  static success(message: string) {
    toast.success(message, {
      ...this.baseOptions,
      style: {
        ...this.baseStyle,
        background: '#608d67',
      },
    })
  }

  static error(message: string) {
    toast.error(message, {
      ...this.baseOptions,
      style: {
        ...this.baseStyle,
        background: '#df4f51',
      },
    })
  }

  static warning(message: string) {
    toast.warning(message, {
      ...this.baseOptions,
      style: {
        ...this.baseStyle,
        background: '#fabf2a',
      },
    })
  }

  static info(message: string) {
    toast.info(message, {
      ...this.baseOptions,
      style: {
        ...this.baseStyle,
        background: '#4773d3',
      },
    })
  }
}
