param(
[string]$username,
[string]$name
)
Connect-VIServer -Server vcenter.cloudis.lan -User administrator@vsphere.local -Password Supinfo2019!
Get-Vm -Location (Get-Folder $username) -Name $name | Select-Object Name, PowerState, MemoryMB, CreateDate