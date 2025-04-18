
export interface WorkDetail {
  title: string;
  description?: string | { value: string };
  subjects?: string[];
  subject_people?: string[];
  
}

export async function GetSubjectWorks(subject: string,limit: number,offset: number){

    subject = subject.toLocaleLowerCase();
    const result = await fetch(`/api/openlibrary/subject/${encodeURIComponent(subject)}?limit=${limit}&offset=${offset}`)
    const data = await result.json();
    console.log(data);
    return data;
    
}
export async function getWorks(workId: string): Promise<WorkDetail> {
    try {
      
        const response = await fetch('/api/openlibrary/work', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ workId })
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Failed to fetch works');
        }
    
        const data = await response.json();
 
        console.log(data.work);
        return data.work as WorkDetail;
      } catch (err) {
        console.error("getWorks error:", err);
        throw err;
      }
}