param(
[string]$username
)

New-ADUser -Name $username -AccountPassword (Read-Host -AsSecureString "Mettez ici votre mot de passe ") -PassThru | Enable-ADAccount
Connect-VIServer -Server vcenter.cloudis.lan -User administrator@vsphere.local -Password Supinfo2019! > log.txt
#New-Folder -Name $username -Location (Get-Cluster)[0]
New-Folder -Name $username -Location (Get-Folder vm)
#Get-VDSwitch -Name "DSwitch-VM" | New-VDPortgroup -Name "Network-$($username)" -NumPorts 8
#Disconnect-VIServer -Server vcenter.cloudis.lan 