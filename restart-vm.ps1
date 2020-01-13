param(
[string]$name
)
Connect-VIServer -Server vcenter.cloudis.lan -User administrator@vsphere.local -Password Supinfo2019!
Restart-VM -VM $name -RunAsync -Confirm