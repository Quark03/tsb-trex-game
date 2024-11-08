# TSB T-Rex Game

## Development Run

Install Dependencies
```bash
pnpm install
```

Run in development
```bash
pnpm dev
```

Build for production
```bash
pnpm build
```

Preview production
```bash
pnpm preview
```

## Deployment to IST

*Replace xxxxxx for your técnico ID

Connect using sftp 
```
sftp://ist1xxxxxx@sigma.ist.utl.pt
```

Upload the files inside dist folder to web (index.html file should be at the /web level)

Website should be accessible at https://web.tecnico.ulisboa.pt/ist1xxxxxxxx/
