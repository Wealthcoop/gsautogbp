#!/bin/bash

# Update prisma usage to getPrisma() - but be careful not to replace inside strings or comments
# This will replace patterns like "await prisma." with "await getPrisma()."
find . -name "*.ts" -o -name "*.tsx" | grep -v node_modules | grep -v .build | grep -v lib/auth.ts | xargs sed -i 's/await prisma\./await getPrisma()./g'
find . -name "*.ts" -o -name "*.tsx" | grep -v node_modules | grep -v .build | grep -v lib/auth.ts | xargs sed -i 's/const prisma = /const prisma = getPrisma(); \/\/ /g'
find . -name "*.ts" -o -name "*.tsx" | grep -v node_modules | grep -v .build | grep -v lib/auth.ts | xargs sed -i 's/prisma\./getPrisma()./g'

echo "Prisma usage fixes applied"
