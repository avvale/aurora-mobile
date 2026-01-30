/**
 * ============================================
 * TIPOS DE INFRAESTRUCTURA GRAPHQL
 * ============================================
 *
 * Este archivo va aquí porque:
 *
 * 1. Son tipos de INFRAESTRUCTURA, no de dominio
 * 2. Son compartidos por todos los servicios GraphQL
 * 3. NO se auto-generan (a diferencia de DTOs)
 * 4. Separados de models/ que es solo lógica de negocio
 *
 * ============================================
 */
/**
 * QueryStatement input for GraphQL queries
 */
export interface QueryStatementInput {
  where?: Record<string, unknown>;
  include?: string[];
  order?: Record<string, 'ASC' | 'DESC'>;
  limit?: number;
  offset?: number;
}

/**
 * Generic paginated response structure
 */
export interface PaginatedResponse<T> {
  total: number;
  count: number;
  rows: T[];
}
