import { prisma } from "../infra/connection/prisma"

interface IOrderRepository {
  getOrders(): Promise<any>
  getOrdersByUzer(idUzer: number | string): Promise<any>
  getCreatedOrdersByUser(idClient: number | string): Promise<any>
  getOrderById(id: number | string): Promise<any>
  getActiveOrders(): Promise<any>
}

class OrderRepository implements IOrderRepository {
  async getOrders() {
    return await prisma.order.findMany()
  }

  async getOrdersByUzer(id: number | string) {
    return await prisma.order.findMany({
      where: {
        uzerId: String(id),
      },
    })
  }

  async getCreatedOrdersByUser(id: number | string) {
    return await prisma.order.findMany({
      where: {
        clientId: String(id),
      },
    })
  }

  async getOrderById(id: number | string) {
    return await prisma.order.findUnique({ where: { id: String(id) } })
  }

  async getActiveOrders() {
    return await prisma.order.findMany({
      where: {
        available: true,
      },
    })
  }
}

export const orderRepository = new OrderRepository()
