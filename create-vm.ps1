param(
[string]$templatevm,
[string]$vmname,
[string]$username
)

Connect-VIServer -Server vcenter.cloudis.lan -User administrator@vsphere.local -Password Supinfo2019! > log.txt
$myCluster = Get-Cluster -Name Cluster-Cloudis
$myDatastore = Get-Datastore -Name Datastore-Cloudis-1
$myTemplate = Get-Template -Name $templatevm
$myVdportGroup = Get-VDPortgroup -Name "Network-$($username)"
#$myTemplate = Get-Template -Name windows-10
#New-VM -Name $vmname -Datastore $myDatastore -ResourcePool $myCluster -Template $myTemplate 
New-VM -Name $vmname -Datastore $myDatastore -ResourcePool $myCluster -Portgroup $myVdportGroup -Template $myTemplate 
