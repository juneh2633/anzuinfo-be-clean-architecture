export interface DomainEvent {
  readonly eventName: string;
  readonly aggregateId: string | number;
  readonly occurredAt: Date;
}

