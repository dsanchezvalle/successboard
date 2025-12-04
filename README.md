# SuccessBoard

SuccessBoard is a modern Customer Success dashboard built with Next.js 15, TypeScript, TailwindCSS, and shadcn/ui.  
It is designed as a backend-agnostic and brand-agnostic frontend that can integrate with multiple data sources.

For this proof of concept, SuccessBoard consumes the public APIs and microservices of the **Spring Petclinic Microservices** project. Petclinic provides realistic entities such as owners, pets, and visits, which we reinterpret for Customer Success use cases:

- **Owners → Customers / Accounts**
- **Pets → Products / Subscriptions**
- **Visits → Interactions / Touchpoints**

This allows SuccessBoard to demonstrate real API integration, error handling, routing, component design, and dashboard architecture.

---

## About Spring Petclinic (Upstream Project Credit)

SuccessBoard uses the **Spring Petclinic Microservices** project as a proof-of-concept backend during development.

**Spring Petclinic** is an open-source sample application built by the Spring team at VMware.  
Its goal is to demonstrate best practices in building Java microservices using Spring Boot, Spring Cloud, and related technologies.

Petclinic provides several microservices such as:

- Customers Service
- Vets Service
- Visits Service
- API Gateway
- Discovery Server (Eureka)

These services expose real REST APIs and form a fully functional distributed backend.  
SuccessBoard consumes these APIs only for educational and demonstration purposes.

### License and Attribution

Spring Petclinic Microservices is licensed under the **Apache License 2.0**.  
Project source: https://github.com/spring-petclinic/spring-petclinic-microservices

SuccessBoard is **not affiliated** with VMware, the Spring team, or the Petclinic project.  
All credit for the backend architecture and data model used in this proof of concept belongs to the Petclinic authors.

---

## Customer Success Data (Mocks)

Petclinic does not provide metrics normally required in Customer Success workflows, such as:

- Health scores
- Usage analytics
- Churn risk
- Subscription tiers (MRR / ARR)
- Engagement metrics

For these areas, SuccessBoard currently uses **frontend mocks**, cleanly separated from Petclinic data models.  
All mocks are replaceable with a real backend in a future phase.

---

## Goals

- Deliver a clean, modern, production-ready frontend
- Showcase UI/UX, design systems, and component architecture
- Provide a realistic Customer Success interface using real APIs
- Keep the project easily extensible for other companies or backends

---

## Tech Stack

- **Next.js 15 (App Router)**
- **React 19 + React Compiler**
- **TypeScript**
- **TailwindCSS**
- **shadcn/ui**
- **Storybook**
- **Spring Petclinic Microservices API** as proof-of-concept backend

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

Make sure the Petclinic backend is running:

```bash
docker compose up
```

API Gateway (default):

```
http://localhost:8080
```

---

## Project Structure (planned)

```
src/
  app/
  components/
    ui/
    shared/
  features/
    customers/
      api/
      mocks/
      components/
      types.ts
  lib/
```

---

## Future Work

- Replace Customer Success mocks with a real data source
- Add multi-brand theming and configuration
- Introduce authentication, roles, and permissions
- Add subscription analytics and a customer health scoring engine
