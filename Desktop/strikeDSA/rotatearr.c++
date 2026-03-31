#include <iostream>
using namespace std;

int main(){
    int arr[]={12,3,8,9,10};
    int n=5;
   int k=2;

int start=0;
int end=n-1;
while(start<end){
    int temp=arr[start];
    arr[start]=arr[end];
    arr[end]=temp;
     start++;
     end--; 
}

int i=0, j=k;

while(i<j){
    int stemp=arr[i];
    arr[i]=arr[j];
    arr[j]=stemp;
    i++;
    j--;
}

int l=k+1; int m=n-1;
while(l<m){
    int ttemp=arr[l];
    arr[l]=arr[m];
    arr[m]=ttemp;
} 
for(int x=0;x<n;x++){
    cout<<arr[x];
}


}