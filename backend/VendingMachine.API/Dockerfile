FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["VendingMachine.API/VendingMachine.API.csproj", "VendingMachine.API/"]
COPY ["VendingMachine.Application/VendingMachine.Application.csproj", "VendingMachine.Application/"]
COPY ["VendingMachine.Data/VendingMachine.Data.csproj", "VendingMachine.Data/"]
RUN dotnet restore "VendingMachine.API/VendingMachine.API.csproj"
COPY . .
WORKDIR "/src/VendingMachine.API"
RUN dotnet build "./VendingMachine.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./VendingMachine.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "VendingMachine.API.dll"]
