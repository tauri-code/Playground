﻿# Demo
!! This applies to donet core Version 2.0

Demonstrates how to use an X509Certificate2 with the DataProtection Api.  
To install the certificate in the certificate store use:
```PowerShell
PS:\>DataProtectionConsole -i codecraftteam.pfx abc123
```

If the certificate is already in the certificate store use:
```PowerShell
PS:\>DataProtectionConsole
```

To create a custom self-signed certificate a PowerShell cmdlet can be used.
Replace password and dnsname as needed.
```PowerShell
PS:\> $securedPassword = ConvertTo-SecureString -String "abc123" -Force -AsPlainText
PS:\> New-SelfSignedCertificate -certstorelocation cert:\localmachine\my -dnsname codecraftteam
PS:\> Export-PfxCertificate -cert cert:\localMachine\my\thumbprint -FilePath e:\cert.pfx -Password $securedPassword

PS:>gci Cert:\LocalMachine\My
```
Remarks: The certificate will be stored in LocalMaschine > Personal > Certificates
## ISSUES:
This is not working if the certificate is not in the certificate store!  
See https://github.com/aspnet/DataProtection/issues/139  
See https://github.com/aspnet/DataProtection/issues/286

# Dataprotection with dotnet version 2.1
Since 2.1 it is possible to use Certifactes without a Store. A certificat cam be loaden from a file, this can be used to protect and unprotect an string.

