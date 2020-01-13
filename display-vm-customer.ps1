param(
[string]$username
)
Connect-VIServer -Server vcenter.cloudis.lan -User administrator@vsphere.local -Password Supinfo2019!
Get-Vm -Location (Get-Folder $username) | Get-VMGuest | Format-Table VM