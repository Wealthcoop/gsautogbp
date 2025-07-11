#!/bin/bash

# Update authOptions imports to getAuthOptions
find . -name "*.ts" -o -name "*.tsx" | grep -v node_modules | grep -v .build | xargs sed -i 's/import { authOptions }/import { getAuthOptions }/g'
find . -name "*.ts" -o -name "*.tsx" | grep -v node_modules | grep -v .build | xargs sed -i 's/getServerSession(authOptions)/getServerSession(getAuthOptions())/g'

# Update prisma imports to getPrisma
find . -name "*.ts" -o -name "*.tsx" | grep -v node_modules | grep -v .build | xargs sed -i 's/import { prisma }/import { getPrisma }/g'

echo "Import fixes applied"
