#!/bin/bash
echo "🚀 AMANECER Node js project Set Up..."
if [ -f "package.json" ]; then
    #Verify Node js 
    if ! command -v node &> /dev/null 
    then
        echo "📦 Installing Node js..."
        curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
        sudo apt-get install -y nodejs
    else
        echo "☑️ Node js Versión: $(node -v) already installed."
    fi

    #Verify npm
    if ! command -v npm &> /dev/null 
    then
        echo "❌ npm isn't installed, bad Node js installation."
        exit 1
    fi

    #Installing dependencies
    echo "📦 Installing dependencies from package.json..." 
    npm install

    #Creating env file
    if [ -f ".env.example" ] && [ ! -f ".env" ]; then
        echo "📝 Creating .env from .env.example..."
        cp .env.example .env
        echo "✅ .env file created."
        echo "⚠️ remember to fill variables in .env file."
    fi
    echo "🎉 Setup completado."
else
    echo "❌ There isn't file package.json in this directory."
    exit 1
fi