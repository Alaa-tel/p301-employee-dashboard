# P301 Employee Dashboard

A professional operational dashboard for financial services employees to manage cases, track SLAs, and monitor daily metrics.

## Project Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm preview
```

## Technology Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next generation build tool
- **Vuetify 3** - Material Design component framework
- **Vue Router** - Official router for Vue.js
- **chart.js + vue-chartjs** - Data visualization
- **Material Design Icons** - Icon library

## Project Structure

```
src/
├── components/       # Reusable Vue components
├── pages/           # Page components (Dashboard, CaseDetail)
├── router/          # Vue Router configuration
├── assets/          # Static assets
├── App.vue          # Root component
├── main.ts          # Application entry point
└── style.css        # Global styles
```

## Features

- **Dashboard**: Real-time overview of cases, alerts, and metrics
- **Case Management**: Detailed case information and history
- **SLA Tracking**: Visual alerts for at-risk cases
- **Performance Metrics**: Charts and KPIs
- **Responsive Design**: Works on desktop and tablet

## See Also

- [BRIEF.md](./BRIEF.md) - Project brief and specifications
- [PLAN.md](./PLAN.md) - Original project plan

