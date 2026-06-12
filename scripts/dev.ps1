#Requires -Version 5.1
<#
.SYNOPSIS
    Levanta el entorno de DESARROLLO de Star4cast (hot-reload) con Docker Compose.

.DESCRIPTION
    Usa docker-compose.dev.yml. El frontend Angular corre con `ng serve` y se
    recarga en caliente gracias al volumen montado. Disponible en
    http://localhost:4200.

.PARAMETER Build
    Reconstruye las imágenes antes de levantar (tras cambiar dependencias).

.PARAMETER Detached
    Ejecuta en segundo plano (-d) en lugar de mostrar los logs.

.PARAMETER Down
    Para y elimina los contenedores del entorno de desarrollo.

.EXAMPLE
    ./scripts/dev.ps1
    Levanta el entorno y muestra los logs.

.EXAMPLE
    ./scripts/dev.ps1 -Build
    Reconstruye y levanta.

.EXAMPLE
    ./scripts/dev.ps1 -Down
    Tira el entorno de desarrollo.
#>
[CmdletBinding()]
param(
    [switch]$Build,
    [switch]$Detached,
    [switch]$Down
)

$ErrorActionPreference = 'Stop'
$RepoRoot = Split-Path -Parent $PSScriptRoot
$ComposeFile = Join-Path $RepoRoot 'docker-compose.dev.yml'

Push-Location $RepoRoot
try {
    if ($Down) {
        Write-Host 'Parando entorno de desarrollo...' -ForegroundColor Cyan
        docker compose -f $ComposeFile down
        return
    }

    $arguments = @('-f', $ComposeFile, 'up')
    if ($Build) {
        # --build reconstruye la imagen; --renew-anon-volumes refresca el
        # volumen anónimo node_modules desde la imagen recién construida
        # (si no, conserva un node_modules viejo y faltan dependencias nuevas).
        $arguments += '--build'
        $arguments += '--renew-anon-volumes'
    }
    if ($Detached) { $arguments += '-d' }

    Write-Host 'Levantando entorno de desarrollo en http://localhost:4200 ...' -ForegroundColor Green
    docker compose @arguments
}
finally {
    Pop-Location
}
