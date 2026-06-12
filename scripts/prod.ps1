#Requires -Version 5.1
<#
.SYNOPSIS
    Levanta el entorno de PRODUCCIÓN de Star4cast con Docker Compose.

.DESCRIPTION
    Usa docker-compose.yml. El frontend Angular se compila en modo producción y
    se sirve con nginx. Disponible en http://localhost:8080.

.PARAMETER Build
    Reconstruye las imágenes antes de levantar.

.PARAMETER Foreground
    Ejecuta en primer plano mostrando los logs (por defecto va en segundo plano).

.PARAMETER Down
    Para y elimina los contenedores del entorno de producción.

.EXAMPLE
    ./scripts/prod.ps1 -Build
    Compila y levanta en segundo plano.

.EXAMPLE
    ./scripts/prod.ps1 -Down
    Tira el entorno de producción.
#>
[CmdletBinding()]
param(
    [switch]$Build,
    [switch]$Foreground,
    [switch]$Down
)

$ErrorActionPreference = 'Stop'
$RepoRoot = Split-Path -Parent $PSScriptRoot
$ComposeFile = Join-Path $RepoRoot 'docker-compose.yml'

Push-Location $RepoRoot
try {
    if ($Down) {
        Write-Host 'Parando entorno de producción...' -ForegroundColor Cyan
        docker compose -f $ComposeFile down
        return
    }

    $arguments = @('-f', $ComposeFile, 'up')
    if ($Build)         { $arguments += '--build' }
    if (-not $Foreground) { $arguments += '-d' }

    Write-Host 'Levantando entorno de producción...' -ForegroundColor Green
    docker compose @arguments

    if (-not $Foreground) {
        Write-Host 'Star4cast disponible en http://localhost:8080' -ForegroundColor Green
    }
}
finally {
    Pop-Location
}
