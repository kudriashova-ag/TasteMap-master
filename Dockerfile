FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY TasteMap.sln ./
COPY TasteMap/TasteMap.csproj TasteMap/
COPY TasteMap.Application/TasteMap.Application.csproj TasteMap.Application/
COPY TasteMap.Domain/TasteMap.Domain.csproj TasteMap.Domain/
COPY TasteMap.Infrastructure/TasteMap.Infrastructure.csproj TasteMap.Infrastructure/
RUN dotnet restore TasteMap/TasteMap.csproj

COPY TasteMap/ TasteMap/
COPY TasteMap.Application/ TasteMap.Application/
COPY TasteMap.Domain/ TasteMap.Domain/
COPY TasteMap.Infrastructure/ TasteMap.Infrastructure/
RUN dotnet publish TasteMap/TasteMap.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_ENVIRONMENT=Production
ENTRYPOINT ["dotnet", "TasteMap.dll"]
